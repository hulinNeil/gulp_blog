const mongoose = require('mongoose');
const { Article } = require('../util/mongodb');

module.exports = async function editor(ctx) {
  let cookie = ctx.cookies.get('username');
  if (!cookie || cookie !== 'hulin') {
    ctx.response.redirect(`/login?redirect_uri=${ctx.request.header.host}${ctx.request.url}`);
    return;
  }
  let articleID = ctx.params.id;
  let markdown = '',
    title = '',
    tags = [];
  if (articleID && ~[12, 24].indexOf(articleID.length)) {
    let sid = mongoose.Types.ObjectId(articleID);
    let result = await Article.findOne({ _id: sid });
    if (result) {
      markdown = result.markdown;
      title = result.title;
      tags = result.tags;
    }
  }

  await ctx.render('editor', {
    markdown,
    title,
    tags
  });
}
