module.exports = async function (ctx, next) {
  const { hook, theme, service } = this;
  const { name } = ctx.params;
  const tag = await service.call('system/plugin/app', 'getTagByName', name);
  if (!tag) return;
  const posts = await service.call('system/plugin/app', 'getPosts', { tagId: tag.id });
  const state = {
    data: {
      title: `${tag.name}标签下的文章`,
      posts,
      tag
    }
  };

  // 调用钩子
  await hook.emit('system.plugin.app.controller.tag.01', state);

  const renderParams = {
    pageId: 6,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit('system.plugin.app.controller.tag.02', renderParams);

  return await theme.render(renderParams);
}
