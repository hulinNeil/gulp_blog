module.exports = {
  js: {
    input: 'src/js/**/*.js',
    output: 'server/public/js/'
  },
  css: {
    input: 'src/css/**/*.less',
    output: 'server/public/css/'
  },
  html: {
    input: 'src/html/**/*.html',
    output: 'server/views/'
  },
  server: {
    input: ['server/*.js','server/util/*.js','server/routes/**/*.js']
  }
}
