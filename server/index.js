const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const render = require('koa-ejs');
const router = require('./routes/router');

const app = new koa();
const main = serve(path.join(__dirname + '/public'));//静态资源

render(app, {// ejs 模版引用
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
});

app.use(main);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {// 处理错误
  await ctx.render('404');
});

// 监听端口
app.listen(7028, function() {
  console.log('app run port:7028');
});
