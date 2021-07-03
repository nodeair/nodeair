'use strict';

/**
 * 驼峰转换下划线
 * @param {String} name 数据源
 * @return {String} 字符串
 */
function nameToLine(name) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

module.exports = nameToLine;
