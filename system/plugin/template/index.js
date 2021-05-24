async function loaded() {
  const {
    hook
  } = this;

  // 调用钩子
  await hook.on('core.app.router.02', async function (route) {
    const oldController = route[2];
    route[2] = async function (ctx, next) {
      ctx.set('Content-Type', 'text/html; charset=utf-8');
      // 调用钩子
      await hook.emit('core.template.01', ctx);
      const state = await oldController.apply(this, [ctx, next]);
      ctx.body = this.theme.render('index', state);
    }
  });
}

module.exports = loaded;
