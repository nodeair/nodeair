'use strict';

const htmlMinify = require('html-minifier').minify;
const htmlPrettify = require('pretty');

module.exports = {
  /**
   * 最小化
   * @param {String} html html代码
   * @return {String} 最小化html代码
   */
  minify(html) {
    return htmlMinify(html, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
    });
  },
  /**
   * 美化
   * @param {String} html html代码
   * @return {String} 美化后的html代码
   */
  prettify(html) {
    return htmlPrettify(html);
  },
};
