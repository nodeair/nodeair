const path = require('path');

const installViewController = require('./controller/view/install');
const notInstalledController = require('./controller/view/not-installed');
const installApiController = require('./controller/api/install');

const langConf = require('./lang');

/**
 * 检查NodeAir是否安装
 */
async function checkInstall() {
  const { config, db } = this
  const confiIsInstalled = config.isInstalled;
  const pluginBaseDir = path.join(__dirname, '../');
  const PostModel = require(path.join(pluginBaseDir, 'app', 'model/post'));
  const isModelExist = await db.existsModel(PostModel);
  return confiIsInstalled && isModelExist;
}

async function loaded() {
  const { koaApp, lang, koaRouter, hook } = this;
  // 注册插件所使用的多语言文案
  lang.register(langConf.call(this));

  const app = this;
  const isInstalled = await checkInstall.call(this);

  if (!isInstalled) {
    const state = {
      router: [
        {
          url: '/install',
          controller: installViewController.bind(app)
        },
        {
          url: '/api/install',
          controller: installApiController.bind(app)
        },
        {
          url: '/',
          controller: notInstalledController.bind(app)
        }
      ],
      async handler404(ctx, next) {
        try {
          await next();
          if (!ctx.body) {
            await notInstalledController.apply(app, [ ctx, next ]);
          }
        } catch (e) {
          ctx.body = '500'
        }
      }
    }

    // 调用钩子
    hook.emit('core.install.01', state);

    // 处理404情况
    koaApp.use(state.handler404)

    // 循环注册路由
    for (const item of state.router) {
      koaRouter.get(item.url, item.controller);
    }
  }
}

module.exports = loaded;
