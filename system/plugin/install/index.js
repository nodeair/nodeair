const path = require('path');

const routerConfig = require('./router-config');
const langConf = require('./lang');

/**
 * 检查 NodeAir 是否安装
 */
async function checkInstall() {
  const { constant, config, db } = this;
  const { SYSTEM_PLUGIN_DIR } = constant;
  const confiIsInstalled = config.isInstalled;
  // 首先检测数据库是否连接成功
  const isConnected = await db.checkConnected();
  if (!isConnected) return false;
  const PostModel = require(path.join(SYSTEM_PLUGIN_DIR, 'app', 'model/post'));
  const isModelExist = await db.existsModel(PostModel);
  return confiIsInstalled && isModelExist;
}

async function loaded() {
  const { koa, lang, router, hook } = this;
  const app = this;
  const isInstalled = await checkInstall.call(this);

  if (isInstalled) return;
  // 注册插件所使用的多语言文案
  lang.register(langConf.call(this));

  const state = {
    router: routerConfig.call(app),
    async handler404(ctx, next) {
      try {
        await next();
        if (!ctx.body) await notInstalledController.apply(app, [ctx, next]);
      } catch (e) {
        ctx.body = '500';
      }
    }
  }

  // 调用钩子
  await hook.emit('core.install.01', state);

  // 处理404情况
  koa.app.use(state.handler404)

  // 循环注册路由
  for (const item of state.router) {
    router.push(item.type, item.url, item.controller);
  }
}

module.exports = loaded;
