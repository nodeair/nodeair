/**
 * 路由类
 */
class Router {
  constructor(app) {
    app.log.system('实例化Router类');
    this.app = app;
    this.routers = {};
    this.errorHandlers = [];
    this.init();
  }
  /**
   * 初始化
   */
  init() {
    const { app } = this;
    const { koa } = app;
    const { errorHandlers } = this;
    const emitHandlers = async (ctx, next) => {
      for (let i = 0; i < errorHandlers.length; i++) {
        const item = errorHandlers[i];
        const { controller } = item;
        await controller.apply(app, [ctx, next]);
      }
    }
    koa.app.use(async (ctx, next) => {
      try {
        await next();
        if (!ctx.body) {
          await emitHandlers(ctx, next);
        }
      } catch (e) {
        app.log.error(e);
        await emitHandlers(ctx, next);
      }
    });
  }
  /**
   * 判断某个路由是否已经被注册
   */
  has(method, url) {
    const key = this._key(method, url);
    return Boolean(this.routers[key]);
  }
  /**
   * 注册错误处理器
   * @param {String} name 处理器名称
   */
  pushErrorHandler(name, controller) {
    this.errorHandlers.push({
      name,
      controller
    });
  }
  /**
   * 移除错误错误器
   * @param {String} name 处理器名称
   */
  removeErrorHandler(name) {
    for (let i = 0; i < this.errorHandlers.length; i++) {
      const handler = this.errorHandlers[i];
      if (handler.name === name) {
        this.errorHandlers.splice(i, 1);
      }
    }
  }
  /**
   * 注册多个路由和控制器
   * @param {Array} array 路由配置
   */
  async push(array) {
    const { hook } = this.app;
    const HOOK_NAMESPACE = 'system/core/router/push';
    await hook.emit(HOOK_NAMESPACE, 1, array);
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      await hook.emit(HOOK_NAMESPACE, 2, item);
      const { method, path, controller } = item;
      this.pushOne(method, path, controller);
    }
  }
  /**
   * 注册一个路由和一个控制器
   * @param {String} method 请求方法
   * @param {String} path 请求路径
   * @param {Function} controller 控制器
   */
  pushOne(method, path, controller) {
    const { koa } = this.app;
    const { middleware } = koa;
    method = method.toLowerCase();
    if (typeof controller !== 'function') return;
    const routerFn = middleware.router[method];
    if (typeof routerFn !== 'function') return;

    const key = this._key(method, path);
    controller = controller.bind(this.app);
    this.routers[key] = controller;
    middleware.router[method](path, controller);
  }
  /**
   * 删除多个路由和控制器
   * @param {Array} array 路由配置
   */
  async remove(array) {
    const { hook } = this.app;
    const HOOK_NAMESPACE = 'system/core/router/remove';
    await hook.emit(HOOK_NAMESPACE, 1, array);
    for (let i = 0; i < array.length; i++) {
      const item = array[i];
      await hook.emit(HOOK_NAMESPACE, 2, item);
      const { method, path } = item;
      this.removeOne(method, path);
    }
  }
  /**
   * 删除一个路由和它的控制器
   * @param {String} method 请求方法
   * @param {String} path 请求路径
   */
  removeOne(method, path) {
    const { koa } = this.app;
    const { middleware } = koa;
    method = method.toLowerCase();
    const routerFn = this.app.koa.middleware.router[method];
    if (typeof routerFn !== 'function') return;
    const key = this._key(method, path);
    delete this.routers[key];
    for (let i = 0; i < middleware.router.stack.length; i++) {
      const layer = middleware.router.stack[i];
      if (layer.methods.includes(method.toUpperCase()) && layer.path === path) {
        middleware.router.stack.splice(i, 1);
      }
    }
  }
  /**
   * 获取存储在内存中的路由Key
   */
  _key(method, url) {
    method = method.toLowerCase();
    return `${method}: ${url}`;
  }
}

module.exports = Router;
