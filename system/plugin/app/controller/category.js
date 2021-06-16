module.exports = async function (ctx, next) {
  const { hook, theme, service } = this;
  const { id } = ctx.params;
  const category = await service.call('system/plugin/app', 'getCategory', { id });
  const posts = await service.call('system/plugin/app', 'getPosts', { categoryId: id });
  const state = {
    data: {
      title: `${category.name}分类下的文章`,
      posts,
      category
    }
  };

  // 调用钩子
  await hook.emit('system.plugin.app.controller.category.01', state);

  const renderParams = {
    pageId: 5,
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit('system.plugin.app.controller.category.02', renderParams);

  return await theme.render(renderParams);
}
