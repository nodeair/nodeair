async function installController(ctx) {
  const { theme, hook } = this;
  const HOOK_NAMESPACE = 'system/plugin/install/controller/view/install';
  const state = {
    data: {
      title: '安装页',
      text: '欢迎使用NodeAir，本安装指引会引导您安装NodeAir程序。'
    }
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 构造
  const renderParams = { 
    pageId: 2,
    data: state.data,
    ctx
  };

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 2, renderParams);

  // 返回
  return await theme.render(renderParams);
}

module.exports = installController;
