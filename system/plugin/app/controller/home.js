module.exports = async function (ctx, next) {
  const {
    hook
  } = this;
  const state = {
    data: {
      title: "首页",
      text: 'Hello World! My Name is '
    }
  }

  // 调用钩子
  await hook.emit('core.app.controller.home.01', state);

  return state;
}
