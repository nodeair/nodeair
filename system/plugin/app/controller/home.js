module.exports = async function (ctx, next) {
  const { hook, theme } = this;
  const state = {
    data: {
      title: '首页',
      text: 'Hello World! My Name is '
    }
  }

  // 调用钩子
  await hook.emit('core.app.controller.home.01', state);

  const renderParams = {
    pageName: 'index',
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit('core.app.controller.home.02', renderParams);

  return await theme.render(renderParams);
}
