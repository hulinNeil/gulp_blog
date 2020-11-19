const mongoose = require('mongoose');
const { Article, Tags } = require('../../utils/mongodb');

module.exports = async (ctx) => {
  let cookie = ctx.cookies.get('username');
  if (!cookie || cookie !== 'hulin') {
    ctx.body = { success: false, desc: '无权限！' };
    return;
  }

  const { title, markdown, html, tags, articleID } = ctx.request.body;

  const schemaData = { title, markdown, html, tags, desc: '' };

  let p = html.match(/\<p\>.*?\<\/p\>/ig),
    sid = null,
    isUpdate = false,
    oldData = null;

  if (p) {
    let desc = '';
    for (let i = 0, length = p.length; i < length; i++) {
      desc += p[i].slice(3, - 4);
      if (desc.length > 150) {
        desc += '...';
        break;
      }
    }
    schemaData.desc = desc;
  }

  if (articleID && ~[12, 24].indexOf(articleID.length)) {
    sid = mongoose.Types.ObjectId(articleID);
    let result = await Article.findOne({ _id: sid });
    if (result) {
      isUpdate = true;
      oldData = result;
    }
  }

  let result = null;
  if (isUpdate) {
    result = await Article.findByIdAndUpdate(sid, schemaData);
  } else {
    schemaData.read_times = 0;
    schemaData.create_time = new Date().getTime();
    result = await Article.create(schemaData);
  }

  Tags.find((err, result) => {
    if (err) {
      throw err;
      return;
    }
    tags.forEach(value => {
      let isInList = false,
        item = null;
      for (let i = 0, length = result ? result.length : 0; i < length; i++) {//这里有bug
        item = result[i];
        if (value === item.tag) {
          isInList = true;
          break;
        }
      }
      // 现在的方案，可以保证，每次都能insert,但是update时，出现重复，需要判断是否去重，需要知道原来的article的tags对比现在的，如果重复，则不改变数据，不重复则插入！
      if (isInList) {
        if (!isUpdate || (isUpdate && !~oldData.tags.indexOf(value))) {
          Tags.findByIdAndUpdate(mongoose.Types.ObjectId(item._id), { $set: { num: item.num + 1 } }, err => {
            if (err) {
              throw err;
            }
          });
        }
      } else {
        Tags.create({ tag: value, num: 1 });
      }
    })
  });

  ctx.body = {
    success: true, data: {
      id: result._id
    }
  }
}
