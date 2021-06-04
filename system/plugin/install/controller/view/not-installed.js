async function notInstalledController(ctx) {
  const { theme, hook } = this;
  const state = {
    data: {
      title: '安装页',
      text: '欢迎使用NodeAir，本安装指引会引导您安装NodeAir程序。'
    }
  }

  // 调用钩子
  await hook.emit('system.plugin.install.controller.view.notInstall.01', state);

  const renderParams = {
    pageName: 'not-installed',
    data: state.data,
    ctx
  };

  // 调用钩子
  await hook.emit('system.plugin.install.controller.view.notInstall.02', renderParams);

  return await theme.render(renderParams);
}

module.exports = notInstalledController;
