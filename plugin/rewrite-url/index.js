const _ = require('lodash');

async function loaded() {
  const { log, hook, koa } = this;
  const app = this;
  log.print('加载 rewrite-url 插件');

  hook.on('system/plugin/app/controller/index', 1, async function(state) {
    const routers = _.cloneDeep(state.routers);
    state.routers = [];
    const routerMap = {
      '^/$': '/',
      '^/index.html$': '/',
      '^/search.html$': '/search',
      '^/post/(\\d+).html$': '/post/:id'
    }
    const getController = (path) => {
      let item = routers.find(item => item.path === path);
      return item.controller;
    }
    koa.app.use(async function(ctx, next) {
      await next();
      const pahts = Object.keys(routerMap);
      for (let i = 0; i < pahts.length; i++) {
        let newPath = pahts[i];
        let oldPath = routerMap[pahts[i]];
        let reg = new RegExp(newPath);
        if (reg.test(ctx.path)) {
          const constructor = getController(oldPath);
          await constructor.apply(app, [ ctx, next ]);
        }
      }
    });
  });
}

module.exports = loaded;
