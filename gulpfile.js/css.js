const { src, dest } = require('gulp');
const less = require('gulp-less'); // less转换
const autoprefixer = require('gulp-autoprefixer'); // css+前缀
const uglifyCss = require('gulp-clean-css'); // 压缩css

const { input, output } = require('./paths').css;

function css() {
  return src(input)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(uglifyCss())
    .pipe(dest(output));
}

module.exports = css;
