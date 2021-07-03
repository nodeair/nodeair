'use strict';

/**
 * 数据服务类
 */
class Service {
  constructor(app) {
    this.app = app;
    this._stack = [];
  }
  /**
   * 注册单个服务
   * @param {String} namespace 命名空间
   * @param {String} serviceName 服务名称
   * @param {Function} handler 处理器
   */
  registerOne(namespace, serviceName, handler) {
    this._stack.push({
      namespace,
      serviceName,
      handler,
    });
  }
  /**
   * 注册多个服务
   * @param {Array<service>} array 多个服务对象数组
   */
  register(array) {
    array.forEach(item => {
      const { namespace, serviceName, handler } = item;
      this.registerOne(namespace, serviceName, handler);
    });
  }
  /**
   * 调用服务
   * @param {String} namespace 命名空间
   * @param {String} serviceName 服务名称
   * @param {Object} params 调用参数
   */
  async call(namespace, serviceName, params) {
    const { log } = this.app;
    const item = this._stack.find(item => item.namespace === namespace && item.serviceName === serviceName);
    if (!item) {
      log.warn(`警告：没有找到命名空间为“${namespace}”服务名称为“${serviceName}”的服务。`);
      return undefined;
    }
    const { handler } = item;
    if (typeof handler === 'function') {
      return await handler.call(this.app, params);
    }
    return undefined;
  }
}

module.exports = Service;
