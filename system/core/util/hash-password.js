'use strict';

const crypto = require('crypto');

/**
 * 加密密码
 * @param {String} str 字符串
 * @return {String} 加密后的密码
 */
function hashPassword(str) {
  const { config } = this.app;
  const salt = config.createTime;
  return crypto.createHash('md5').update(str + salt).digest('hex');
}

module.exports = hashPassword;
