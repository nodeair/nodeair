const router = require('./router');

async function loaded() {
  // 加载模型
  await router(this);
}

module.exports = loaded;
