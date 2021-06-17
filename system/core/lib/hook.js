const _ = require('lodash');

/**
 * 事件钩子类
 */
class Hook {
  constructor(app) {
    app.log.system('实例化Hook类');
    this.app = app;
    this.events = {};
  }
  /**
   * 监听事件
   * @param {String} eventName 事件名称
   * @param {String} id 事件ID
   * @param {Function} handler 回调函数
   */
  on(eventName, id, handler) {
    if (typeof handler !== 'function') return;
    if (!_.isPlainObject(this.events[eventName])) {
      this.events[eventName] = {};
    }
    if (!Array.isArray(this.events[eventName][id])) {
      this.events[eventName][id] = [handler];
    } else {
      this.events[eventName][id].push(handler);
    }
  }
  /**
   * 触发事件
   * @param {String} eventName 事件名称
   * @param {String} id 事件ID
   * @param {Object} params 传入参数
   */
  async emit(eventName, id, params) {
    const events = this.events[eventName];
    if (!_.isPlainObject(events)) return;
    const handlers = events[id];
    if (!Array.isArray(handlers)) return;
    for (const handler of handlers) {
      await handler.call(this.app, params);
    }
  }
}

module.exports = Hook;
