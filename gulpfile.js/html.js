const {
  src,
  dest
} = require('gulp');

const minifyHTML = require('gulp-minify-html'); // 用于压缩 html
const through2 = require('through2');

const {
  input,
  output
} = require('./paths').html;

function minify(content){
  return
}

function html() { // 复制+压缩
  return src(input)
    .pipe(through2.obj(function(file, enc, callback) {
      if (file.isBuffer()) {
        var contents = file.contents.toString('utf-8');
        file.contents = new Buffer(contents.replace(/>\s+</g,'><').replace(/\<[a-z].+\s+?.*?\>/g,value =>{
          return value.replace(/\s+/,' ');
        }));
      }
      this.push(file);
      callback();
    }))
    .pipe(dest(output));
}

module.exports = html;
