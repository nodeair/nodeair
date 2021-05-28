const _ = require('lodash');

/**
 * Head类
 */
 class Head {
  constructor() {
    this._heads = [];
  }
  /**
   * 添加JS脚本
   */
  pushScript(url) {
    const html = `<script src="${url}"></script>`;
    return this.push(html);
  }
  /**
   * 添加CSS
   */
  pushCSS(url) {
    const html = `<link rel="stylesheet" href="${url}">`;
    return this.push(html);
  }
  /**
   * 添加自定义HTML标签
   */
  push(html, type) {
    switch (type) {
      case 'css': return this.pushCSS(html);
      case 'script': return this.pushScript(html);
    }
    this._heads.push(html);
    return this._heads.length - 1;
  }
  /**
   * 将head节点插入html
   * @param {Cheerio} $ JQuery选择器 
   */
  insertToHtml($) {
    let heads = _.cloneDeep(this._heads);
    heads.reverse();
    heads.forEach(function (head) {
      $('head').prepend(head);
    });
    return $.html();
  }
}

module.exports = Head;
