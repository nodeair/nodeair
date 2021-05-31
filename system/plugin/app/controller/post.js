module.exports = async function (ctx, next) {
  const { hook, theme } = this;
  const state = {
    data: {
      title: '文章',
      text: 'Hello World! My Name is '
    }
  }

  // 调用钩子
  await hook.emit('core.app.controller.post.01', state);

  const renderParams = {
    pageName: 'post',
    data: state.data,
    ctx
  }

  // 调用钩子
  await hook.emit('core.app.controller.post.02', renderParams);

  return await theme.render(renderParams);
}
