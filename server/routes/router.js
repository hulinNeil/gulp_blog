const router = require('koa-router')();

/* 页面 */
const index = require('./index');
const tagList = require('./tag');
const detail = require('./detail');
const editor = require('./editor');
const login = require('./login');
/* 接口 */
const apiLogin = require('./api/login');
const articleStorage = require('./api/articleStorage');
const uploadImg = require('./api/uploadImg');

const pages = {
  '/': index,
  '/tag/:tag': tagList,
  '/editor': editor,
  '/editor/:id': editor,
  '/login': login,
  '/detail/:id': detail
}

const postApi = {
  '/login': apiLogin,
  '/articleStorage': articleStorage
}

/* 页面 */
for (let key in pages) {
  router.get(key, pages[key]);
}

/* 接口 */
for (let key in postApi) {
  router.post(key, postApi[key]);
}


router.post('/upload', uploadImg);

module.exports = router;
