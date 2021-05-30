const router = require('./router');
const model = require('./model');

async function loaded() {
  const { db } = this;
  // 注册模型
  db.model.push(model);
  // 挂载路由
  await router(this);
}

module.exports = loaded;
