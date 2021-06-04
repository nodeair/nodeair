const model = require('./model');
const routerConfig = require('./controller');
const serviceConfig = require('./service');

async function loaded() {
  const { config, db, router, service, hook } = this;
  // 注册模型
  db.model.push(model);
  // 注册路由
  const routers = await routerConfig(this);
  await router.push(routers);
  // 定义内部状态
  const state = {
    /**
     * 获取某个页面的地址
     * @param {Number} pageId 页面枚举值ID
     * @param {Number} data 模型数据
     */
    getUrl(pageId, data) {
      const route = routers.find(route => route.pageId == pageId);
      if (!route) return '/';
      let path = route.path;
      route.params.forEach(key => {
        path = path.replace(`:${key}`, data[key]);
      });
      return `${config.site.base}${path}`;
    }
  };
  // 触发事件
  await hook.emit('system.plugin.app.01', state);
  // 注册服务
  service.register(serviceConfig);
  // 调用 render 钩子
  hook.on('core.nodeair.theme.render.01', async function(renderState) {
    // 注入导航数据
    const nav = await service.call('system/plugin/app', 'getOption', { key: 'top-nav' });
    renderState.renderOptions.pageData.topNav = nav;
    // 注入路由获取方法
    renderState.renderOptions.getUrl = state.getUrl;
  });
}

module.exports = loaded;
