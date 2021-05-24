module.exports = async function (ctx, next) {
  const {
    hook
  } = this;
  const state = {
    data: '搜索页'
  }

  // 调用钩子
  await hook.emit('core.app.controller.search.01', state);

  ctx.body = state.data;
}