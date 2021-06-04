module.exports = async function (ctx, next) {
  const { hook, theme } = this;
  const state = {
    data: {
      title: '搜索',
      text: '搜索结果'
    }
  }

  // 调用钩子
  await hook.emit('system.plugin.app.controller.search.01', state);

  const renderParams = {
    pageId: 1,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit('system.plugin.app.controller.search.02', renderParams);

  return await theme.render(renderParams);
}
