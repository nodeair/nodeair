/**
 * 解析 request host
 * @param {String} source 数据源
 * @returns String
 */
function parseDomain(source) {
  const [ host, port ] = source.split(':'); 
  return port === '443' ? `https://${host}` : `http://${host}:${port}`;
}

module.exports = parseDomain;
