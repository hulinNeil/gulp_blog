var glob = require('glob');
var path = require('path');

function getEntry() { // 多入口
  var direction = path.join(__dirname, '../src/js/')
  var entry = {};
  glob.sync(direction + '*.js').forEach(file => {
    if (~file.indexOf('.min.js') || ~file.indexOf('base')) {
      return;
    }
    var name = file.match(/[^/]+(?=\.js)/ig)[0]; // 匹配前面没有 / 后面必然是min.js的值
    entry[name] = file;
  });
  return entry;
}

module.exports = {
  mode: 'production',
  entry: getEntry(),
  output: {
    path: __dirname + '/build/js',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};
