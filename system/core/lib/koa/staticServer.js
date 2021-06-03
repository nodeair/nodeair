const fs = require('fs-extra');
const path = require('path');

/**
 * 静态服务类
 */
class Static {
  constructor(koa) {
    this.koa = koa;
    this._stack = [];
    this._init();
  }
  /**
   * 初始化
   */
  _init() {
    const { app, middleware } = this.koa;
    const { send } = middleware;
    const { _stack: stack } = this;
    app.use(async (ctx, next) => {
      await next();
      for (let i = 0; i < stack.length; i++) {
        const item = stack[i];
        const { dir, prefix } = item;
        const _prefix = ctx.path.substr(0, prefix.length);
        if (prefix === _prefix) {
          const _path = ctx.path.slice(prefix.length);
          const filepath = path.join(dir, _path);
          if (!fs.existsSync(filepath)) continue;
          await send(ctx, _path, { root: dir });
        }
      }
    });
  }
  /**
   * 注册静态资源服务
   */
  register(dir, prefix = '') {
    this._stack.push({ dir, prefix });
  }
}

module.exports = Static;
