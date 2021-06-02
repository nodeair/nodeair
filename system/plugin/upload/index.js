const fs = require('fs-extra');
const path = require('path');

async function loaded() {
  const { koa, constant } = this;
  const { ROOT, UPLOAD_NAME } = constant;
  // 监听 upload 文件夹
  koa.app.use(koa.staticCache(ROOT), {
    filter: [UPLOAD_NAME]
  });
}

module.exports = loaded;
