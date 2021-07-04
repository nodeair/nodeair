'use strict';

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
    return this.push(url, 'script');
  }
  /**
   * 添加CSS
   */
  pushCSS(url) {
    return this.push(url, 'css');
  }
  /**
   * 添加自定义HTML标签
   */
  push(url, type) {
    let html = '';
    switch (type) {
      case 'script':
        html = `<script src="${url}"></script>`;
        break;
      case 'css':
        html = `<link rel="stylesheet" href="${url}">`;
        break;
      default:
        html = url;
    }
    this._heads.push(html);
    return this._heads.length;
  }
  /**
   * 将head节点插入html
   * @param {Cheerio} $ JQuery选择器
   */
  insertToHtml($) {
    const heads = _.cloneDeep(this._heads);
    heads.reverse();
    heads.forEach(head => {
      $('head').prepend(head);
    });
    return $.html();
  }
}

module.exports = Head;
