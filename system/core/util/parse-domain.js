'use strict';

/**
 * 解析 request host
 * @param {String} source 数据源
 * @return {String} 完整网址
 */
function parseDomain(source) {
  const [ host, port ] = source.split(':');
  return port === '443' ? `https://${host}` : `http://${host}:${port}`;
}

module.exports = parseDomain;
