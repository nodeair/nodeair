'use strict';

const routerConfig = require('./controller');

async function loaded() {
  const { log, router, conf } = this;
  const app = this;

  // 判断程序是否已安装
  if (!conf.isUserExists()) {
    log.error('[mock] 请先安装 NodeAir');
    return;
  }

  // 定义状态
  const state = {
    routers: await routerConfig(app),
  };

  // 注册路由
  await router.push(state.routers);

  log.system('加载 mock 插件完毕');
}

module.exports = loaded;
