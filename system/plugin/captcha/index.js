const routerConfig = require('./controller');

async function loaded() {
  const { log, router, hook } = this;
  const HOOK_NAMESPACE = 'system/plugin/captcha/loaded';
  const app = this;
  log.system('加载 captcha 插件');
  // 定义状态
  const state = {
    routers: await routerConfig(app)
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 注册路由
  await router.push(state.routers);
}

module.exports = loaded;
