const htmlMinify = require('html-minifier').minify;
const htmlPrettify = require('pretty');

module.exports = {
  /**
   * 最小化
   * @param {*} html 
   * @returns 
   */
  minify(html) {
    return htmlMinify(html, {
      removeComments: true,
      collapseWhitespace: true,
      minifyJS:true, 
      minifyCSS:true
    });
  },
  /**
   * 美化
   * @param {*} html 
   * @returns 
   */
  prettify(html) {
    return htmlPrettify(html);
  }
}
