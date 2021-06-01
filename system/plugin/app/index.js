const model = require('./model');
const routerConfig = require('./controller');

async function loaded() {
  const { db, router } = this;
  // 注册模型
  db.model.push(model);
  // 注册路由
  const routers = await routerConfig(this);
  await router.push(routers);
}

module.exports = loaded;
