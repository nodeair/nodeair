const cheerio = require('cheerio');

/**
 * 删除html标签
 * @param {String} html html代码
 */
function removeHtmlTag(html) {
  const _html = `<div id="_container">${html}</div>`;
  $ = cheerio.load(_html);
  return $('#_container').text();
}

module.exports = removeHtmlTag;
