const {
  fork
} = require('child_process');

var child_process = null;

function server(cb) {
  console.log(child_process ? '重启服务' : '启动服务！');
  if (child_process) {
    child_process.kill();
  }
  child_process = fork('server/index.js');
  cb();
}

module.exports = server;