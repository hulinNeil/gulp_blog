const formidable = require('koa-formidable'); // 图片处理
const fs = require('fs');
const path = require('path');

module.exports = async (ctx) => {
  let form = formidable.parse(ctx.request);

  function formImage() {
    return new Promise((resolve, reject) => {
      form((opt, {
        fields,
        files
      }) => {
        for(let key in files){
          let filename = files[key].name;
          let avatarName = Date.now() + '_' + filename;
          let readStream = fs.createReadStream(files[key].path)
          let writeStream = fs.createWriteStream(path.join(__dirname, '../../public/upload', avatarName));
          readStream.pipe(writeStream);
          resolve('/upload/' + avatarName);
          break;
        }
      })
    })
  }
  let url = await formImage();

  ctx.body = {
    flag: '1',
    msg: '',
    data: url
  }
}
