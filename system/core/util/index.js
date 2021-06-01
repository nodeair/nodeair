const parseDomain = require('./parse-domain');
const hashPassword = require('./hash-password');

/**
 * 工具类
 */
class Util {
  constructor(app) {
    this.app = app;
  }
}

Util.prototype.parseDomain = parseDomain;
Util.prototype.hashPassword = hashPassword;

module.exports = Util;
