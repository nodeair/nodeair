const routerConfig = require('./controller');
const langConf = require('./lang');
const checkInstalled = require('./util/check-installed');
const notInstalledViewController = require('./controller/view/not-installed');

async function loaded() {
  const { lang, router, hook } = this;
  const app = this;

  // 判断程序是否已安装
  const isInstalled = await checkInstalled(this);
  if (isInstalled) return;

  // 注册插件所使用的多语言文案
  lang.register(langConf.call(this));

  // 定义状态
  const state = {
    routers: await routerConfig(app),
    installHandler404: async function(ctx, next) {
      if (ctx.status == '404') {
        await notInstalledViewController.apply(app, [ctx, next]);
      }
    }
  }

  // 调用钩子
  await hook.emit('core.install.01', state);

  // 处理404情况
  router.pushErrorHandler('installHandler404', state.installHandler404);

  // 注册路由
  await router.push(state.routers);
}

module.exports = loaded;
