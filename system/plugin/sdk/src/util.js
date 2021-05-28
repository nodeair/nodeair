/**
 * 工具类
 */
class Util {
  constructor(naInstance) {
    this.naInstance = naInstance;
  }
  /**
   * 生成指定长度的随机字符串
   * @param {Number} length 字符串长度
   * @returns {String}
   */
  randomString(length) {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_';
    let result = '';
    for (let i = length; i > 0; --i) {
      result += str[Math.floor(Math.random() * str.length)];
    }
    return result;
  }
}

export default Util;
