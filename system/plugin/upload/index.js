async function loaded() {
  const { staticServer, log, constant } = this;
  const { UPLOAD_DIR } = constant;
  log.system('加载 upload 插件');
  // 监听 upload 文件夹
  staticServer.register(UPLOAD_DIR, '/upload');
}

module.exports = loaded;
