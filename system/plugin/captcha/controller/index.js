'use strict';

const createController = require('./create');

async function routerConfig(app) {
  const { hook } = app;
  const HOOK_NAMESPACE = 'system/plugin/captcha/controller/index';
  const state = {
    routers: [
      { method: 'GET', path: '/api/captcha/create', controller: createController },
    ],
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 返回路由配置
  return state.routers;
}

module.exports = routerConfig;
