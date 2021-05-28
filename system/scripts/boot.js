const path = require('path');
const NodeAir = require('../core');

async function boot() {
  // 实例化
  const app = new NodeAir();
  // 初始化
  await app.init();
  // 日志打印
  app.log.system('系统初始化完毕');
}

boot();

module.exports = boot;
