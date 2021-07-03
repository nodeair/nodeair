'use strict';

const ejs = require('ejs');

/**
 * EJS 模板引擎预处理
 */
module.exports = {
  /**
   * 渲染文件
   * @param {String} filePath 模板文件路径
   * @param {String} data 模板数据
   * @return {String} html代码
   */
  render(filePath, data) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, data, {
        async: false,
      }, (err, str) => {
        if (err) {
          reject(err);
        } else {
          resolve(str);
        }
      });
    });
  },
  /**
   * 渲染字符串
   */
  renderStr(str, data) {
    return ejs.render(str, data);
  },
};
