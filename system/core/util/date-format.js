'use strict';

const moment = require('moment');

/**
 * 日期格式化
 * @param {Number} timestamp 时间戳
 * @param {String} format 格式描述
 * @returns {String} 格式化之后的日期
 */
function dateFormat(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(timestamp).format(format);
}

module.exports = dateFormat;
