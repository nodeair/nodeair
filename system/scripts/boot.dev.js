'use strict';

const NodeAir = require('../core');

async function boot() {
  // 实例化
  const app = new NodeAir({ env: 'dev' });
  // 初始化
  await app.init();
  // 日志打印
  app.log.system('内核初始化完毕');
}

boot();

module.exports = boot;
