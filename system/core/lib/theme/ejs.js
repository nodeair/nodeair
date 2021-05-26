const ejs = require('ejs');

/**
 * EJS 模板引擎预处理
 */
module.exports = {
  /**
   * 渲染文件
   * @param {*} filePath 
   * @param {*} data 
   * @returns 
   */
  render(filePath, data) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(filePath, data, {
        async: false
      }, function (err, str) {
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
  }
}
