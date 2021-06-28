const randomString = require('../../core/util/random-string');

module.exports = {
  /**
   * 获取上传后的文件名
   */
  getFilename(time) {
    const string = randomString();
    time = String(time || new Date().getTime());
    let filename = '';
    for (let i = 0; i < string.length; i++) {
      filename += string.charAt(i) + time.charAt(i);
    }
    return filename;
  }
}
