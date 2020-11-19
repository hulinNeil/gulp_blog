const mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:128973@127.0.0.1:27017/blog'); // 服务器
mongoose.connect('mongodb://@127.0.0.1:27017/blog'); // 本地

let db = mongoose.connection;
// 防止Mongoose: mpromise 错误
mongoose.Promise = global.Promise;

db.on('error', function () {
  console.log('数据库连接出错！');
});
db.on('open', function () {
  console.log('数据库连接成功！');
});

const articleSchema = mongoose.Schema({
  title: String,
  markdown: String,
  html: String,
  desc: String,
  tags: Array,
  read_times: Number,
  create_time: Number
});

const Article = mongoose.model('Article', articleSchema);


const tagsSchema = mongoose.Schema({
  tag: String,
  num: Number
});

const Tags = mongoose.model('Tags', tagsSchema);

module.exports = {
  Article,
  Tags
};
