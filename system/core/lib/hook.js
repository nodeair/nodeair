/**
 * 事件钩子类
 */
class Hook {
  constructor(app) {
    this.app = app;
    this.events = [];
  }

  /**
   * 监听事件
   */
  on(eventName, handler) {
    if (typeof handler !== 'function') return;
    if (Array.isArray(this.events[eventName])) {
      this.events[eventName].push(handler);
    } else {
      this.events[eventName] = [handler];
    }
  }

  /**
   * 触发事件
   */
  async emit(eventName) {
    const handlers = this.events[eventName];
    if (!Array.isArray(handlers)) return;
    const args = Array.prototype.slice.call(arguments, 1);
    for (const handler of handlers) {
      await handler.apply(this.app, args);
    }
  }
}

module.exports = Hook;