const homeController = require('./home');
const searchController = require('./search');
const postController = require('./post');
const categoryController = require('./category');
const tagController = require('./tag');
const archiveController = require('./archive');
const aboutController = require('./about');
const HOOK_NAMESPACE = 'system/plugin/app/controller/index';

async function routerConfig(app) {
  const { hook } = app;
  const state = {
    routers: [
      // 首页
      { pageId: 0, params: [], method: 'GET', path: '/', controller: homeController },
      { pageId: 0, params: [ 'pageNumber' ], method: 'GET', path: '/page/:pageNumber', controller: homeController },
      // 搜索页
      { pageId: 1, params: [ 'keywords' ], method: 'GET', path: '/search/:keywords', controller: searchController },
      { pageId: 1, params: [ 'keywords', 'pageNumber' ], method: 'GET', path: '/search/:keywords/:pageNumber', controller: searchController },
      // 分类页
      { pageId: 5, params: [ 'id' ], method: 'GET', path: '/cate/:id', controller: categoryController },
      { pageId: 5, params: [ 'id', 'pageNumber' ], method: 'GET', path: '/cate/:id/:pageNumber', controller: categoryController },
      // 标签页
      { pageId: 6, params: [ 'name' ], method: 'GET', path: '/tag/:name', controller: tagController },
      { pageId: 6, params: [ 'name', 'pageNumber' ], method: 'GET', path: '/tag/:name/:pageNumber', controller: tagController },
      // 归档页
      { pageId: 7, params: [], method: 'GET', path: '/archive', controller: archiveController },
      // 关于
      { pageId: 8, params: [], method: 'GET', path: '/about', controller: aboutController },
      // 文章页
      { pageId: 3, params: [ 'id' ], method: 'GET', path: '/post/:id', controller: postController },
    ]
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 返回路由配置
  return state.routers;
}

module.exports = routerConfig;
