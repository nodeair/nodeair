const installViewController = require('./view/install');
const notInstalledViewController = require('./view/not-installed');
const installApiController = require('./api/install');

async function routerConfig(app) {
  const { hook } = app;
  const state = {
    routers: [
      { method: 'GET', path: '/install', controller: installViewController },
      { method: 'POST', path: '/api/install', controller: installApiController },
      { method: 'GET', path: '/', controller: notInstalledViewController }
    ]
  };

  // 调用钩子
  await hook.emit('core.app.install.routerConfig.01', state);

  // 返回路由配置
  return state.routers;
}

module.exports = routerConfig;
