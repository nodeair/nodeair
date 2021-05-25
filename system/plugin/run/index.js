async function loaded() {
  const {
    koaApp,
    hook,
    config
  } = this;

  const state = {
    port: config.port,
    msg: `This server is running at ${config.protocol}://${config.host}:${config.port}`
  };

  // 调用钩子
  await hook.emit('core.run.01', state);

  koaApp.listen(state.port, () => {
    console.log(`${state.msg}`);
  });
}

module.exports = loaded;
