async function loaded() {
  const { koa, hook, config } = this;
  const HOOK_NAMESPACE = 'system/plugin/run/loaded';

  // 定义状态
  const state = {
    port: config.port,
    msg: `This server is running at ${config.protocol}://${config.host}:${config.port}`
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 监听端口
  koa.app.listen(state.port, () => {
    console.log(`${state.msg}`);
  });
}

module.exports = loaded;
