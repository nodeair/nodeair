module.exports = async function (ctx, next) {
  const { hook, theme, service } = this;
  const { id } = ctx.params;
  const state = {
    data: {
      post: await service.call('system/plugin/app', 'getPost', { id })
    }
  };

  // 调用钩子
  await hook.emit('system.plugin.app.controller.post.01', state);

  const renderParams = {
    pageId: 3,
    data: state.data,
    ctx
  };

  // 调用钩子
  await hook.emit('system.plugin.app.controller.post.02', renderParams);

  return await theme.render(renderParams);
}
