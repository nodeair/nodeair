const path = require('path');
const NodeAir = require('../core');

const app = new NodeAir({
  __ROOT: path.join(__dirname, '../../')
});

async function boot() {
  // 初始化
  await app.init();
  // 日志打印
  app.log.system('系统初始化完毕');
}

boot();

module.exports = boot;
