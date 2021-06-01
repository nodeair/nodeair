const NodeAir = require('../core');

async function boot() {
  // 实例化
  const app = new NodeAir({ env: 'prod' });
  // 初始化
  await app.init();
}

boot();

module.exports = boot;
