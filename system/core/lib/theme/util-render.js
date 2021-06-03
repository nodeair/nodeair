const moment = require('moment');

module.exports = function utilRender() {
  const { util } = this;
  return {
    /**
     * @param {Number} timestamp 时间戳
     * @param {String} format 格式描述
     * @returns {String} 格式化之后的日期
     */
    dateFormat(timestamp, format) {
      return util.dateFormat(timestamp, format);
    }
  }
}
