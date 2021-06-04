module.exports = async function (ctx, next) {
  const { hook, theme, service } = this;
  const state = {
    data: {
      title: '首页',
      posts: await service.call('system/plugin/app', 'getPosts')
    }
  };

  // 调用钩子
  await hook.emit('system.plugin.app.controller.home.01', state);

  const renderParams = {
    pageId: 0,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit('system.plugin.app.controller.home.02', renderParams);

  return await theme.render(renderParams);
}
