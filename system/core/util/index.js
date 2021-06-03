const parseDomain = require('./parse-domain');
const hashPassword = require('./hash-password');
const dateFormat = require('./date-format');

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
Util.prototype.dateFormat = dateFormat;

module.exports = Util;
