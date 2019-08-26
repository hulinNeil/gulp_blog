const {
  series,
  watch
} = require('gulp');
const del = require('del');

const html = require('./html');
const css = require('./css');
const script = require('./script');
const server = require('./server');

const htmlInput = require('./paths').html.input,
  cssInput = require('./paths').css.input,
  jsInput = require('./paths').js.input,
  serverInput = require('./paths').server.input;

function watchers() {
  console.log("添加watch");
  watch(jsInput, series(script));
  watch(cssInput, series(css));
  watch(htmlInput, series(html, css));
  watch(serverInput, series(server));
}


exports.html = html;
exports.watch = series(script, html, css, server, watchers);;
exports.default = series(script, html, css);
