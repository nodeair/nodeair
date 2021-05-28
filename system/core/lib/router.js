/**
 * 路由类
 */

class Router {
  constructor(app) {
    this.app = app;
    this.routers = {};
  }
  /**
   * 判断某个路由是否已经被注册
   */
  has(method, url) {
    const key = this._key(method, url);
    return Boolean(this.routers[key]);
  }
  /**
   * 注册一个路由和一个控制器
   */
  push(method, url, controller) {
    const { koa } = this.app;
    method = method.toLowerCase();
    if (typeof controller !== 'function') return;
    const routerFn = koa.router[method];
    if (typeof routerFn !== 'function') return;

    const key = this._key(method, url);
    controller = controller.bind(this.app);
    this.routers[key] = controller;
    koa.router[method](url, controller);
  }
  /**
   * 删除一个路由和它的控制器
   */
  remove(method, url) {
    const { koa } = this.app;
    method = method.toLowerCase();
    const routerFn = this.app.koa.router[method];
    if (typeof routerFn !== 'function') return;
    const key = this._key(method, url);
    delete this.routers[key];
    for (let i = 0; i < koa.router.stack.length; i++) {
      const layer = koa.router.stack[i];
      if (layer.methods.includes(method.toUpperCase()) && layer.path === url) {
        koa.router.stack.splice(i, 1);
      }
    }
  }
  /**
   * 获取404控制器
   */
  get404Controller() {
    return async((ctx) => {
      ctx.body = '404';
    });
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
