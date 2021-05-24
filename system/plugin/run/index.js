async function loaded() {
  const {
    koaApp,
    hook
  } = this;
  const state = {
    port: 3333,
    msg: 'This server is running at http://localhost:'
  };

  // 调用钩子
  await hook.emit('core.run.01', state);

  koaApp.listen(state.port, () => {
    console.log(`${state.msg}${state.port}`);
  });
}

module.exports = loaded;