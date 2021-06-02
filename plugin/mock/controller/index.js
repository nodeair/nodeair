const insertController = require('./insert');

async function routerConfig(app) {
  const state = {
    routers: [
      { method: 'GET', path: '/api/mock/insert', controller: insertController }
    ]
  };

  // 返回路由配置
  return state.routers;
}

module.exports = routerConfig;
