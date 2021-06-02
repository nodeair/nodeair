const model = require('./model');
const routerConfig = require('./controller');
const serviceConfig = require('./service');

async function loaded() {
  const { db, router, service } = this;
  // 注册模型
  db.model.push(model);
  // 注册路由
  const routers = await routerConfig(this);
  await router.push(routers);
  // 注册服务
  service.register(serviceConfig);
}

module.exports = loaded;
