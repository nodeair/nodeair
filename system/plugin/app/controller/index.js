const homeController = require('./home');
const searchController = require('./search');
const postController = require('./post');
const categoryController = require('./category');
const tagController = require('./tag');

async function routerConfig(app) {
  const { hook } = app;
  const state = {
    routers: [
      { pageId: 0, params: [], method: 'GET', path: '/', controller: homeController },
      { pageId: 1, params: [], method: 'GET', path: '/search', controller: searchController },
      { pageId: 3, params: [ 'id' ], method: 'GET', path: '/post/:id', controller: postController },
      { pageId: 5, params: [ 'id' ], method: 'GET', path: '/cate/:id', controller: categoryController },
      { pageId: 6, params: [ 'name' ], method: 'GET', path: '/tag/:name', controller: tagController }
    ]
  };

  // 调用钩子
  await hook.emit('system.plugin.app.controller.routerConfig.01', state);

  // 返回路由配置
  return state.routers;
}

module.exports = routerConfig;
