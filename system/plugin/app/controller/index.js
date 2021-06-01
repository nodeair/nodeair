const homeController = require('./home');
const searchController = require('./search');
const postController = require('./post');

async function routerConfig(app) {
  const { hook } = app;
  const state = {
    routers: [
      { method: 'GET', path: '/', controller: homeController },
      { method: 'GET', path: '/search', controller: searchController },
      { method: 'GET', path: '/post/:id', controller: postController }
    ]
  };

  // 调用钩子
  await hook.emit('core.app.controller.routerConfig.01', state);

  // 返回路由配置
  return state.routers;
}

module.exports = routerConfig;
