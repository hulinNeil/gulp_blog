const { Article } = require('../utils/mongodb');
const getTags = require('../utils/get_tags');
const dateFtt = require('../utils/util').dateFtt;

module.exports = async function login(ctx) {
  const pageSize = 10;
  let currentPage = Number(ctx.query.page) > 1 ? Number(ctx.query.page) : 1;

  let result = await Article.find().select('title desc create_time read_times _id').limit(pageSize).skip(pageSize * (currentPage - 1)).sort('-_id'),
    topList = await Article.find().select('title read_times _id').limit(10).sort('-read_times'),
    count = await Article.count(),
    totalPage = Math.ceil(count / pageSize);

  let list = JSON.parse(JSON.stringify(result)).map(value => {
    value.create_time = dateFtt(value.create_time, 'yyyy-MM-dd hh:mm:ss');
    return value;
  });

  const tags = await getTags();

  await ctx.render('index', { list, totalPage, currentPage, href: ctx.origin, topList, tags,tag:'' });
}
