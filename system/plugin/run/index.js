async function loaded() {
  const { koa, hook, config } = this;

  const state = {
    port: config.port,
    msg: `This server is running at ${config.protocol}://${config.host}:${config.port}`
  };

  // 调用钩子
  await hook.emit('core.run.01', state);

  koa.app.listen(state.port, () => {
    console.log(`${state.msg}`);
  });
}

module.exports = loaded;
