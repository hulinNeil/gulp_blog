const { src, dest, series } = require('gulp');
const del = require('del');
const babel = require('gulp-babel'); // 用于ES6转化ES5
const uglify = require('gulp-uglify'); // 用于压缩 JS
const webpack = require('webpack-stream'); // 用于打包模块
const webpackConfig = require('./webpack.config');// webpack 配置

const { input, output } = require('./paths').js;

function clean() {
  return del([output]);
}

function base() {
  console.log('处理js');
  return src(['src/js/base.js'])
    .pipe(babel())
    .pipe(dest(output));
}

function copy() {
  return src(['src/js/preview.min.js', 'src/js/prism.min.js'])
  .pipe(dest(output));
}

function script(){
  // 处理含有模块的js
  return src([input,'!src/js/preview.min.js', '!src/js/prism.min.js','!src/js/base.js'])
  // .pipe(babel())
  .pipe(webpack(webpackConfig))
  .pipe(dest(output));
}

module.exports = series(clean, copy, base, script);
