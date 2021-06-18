async function loaded() {
  const { staticServer, hook, log, constant } = this;
  log.system('加载 upload 插件');
  const HOOK_NAMESPACE = 'system/plugin/upload/loaded';
  const { UPLOAD_DIR } = constant;
  const state = {
    prefix: '/upload'
  }
  // 触发事件
  await hook.emit(HOOK_NAMESPACE, 1, state);
  // 监听 upload 文件夹
  staticServer.register(UPLOAD_DIR, state.prefix);
}

module.exports = loaded;
