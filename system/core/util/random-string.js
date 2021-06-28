/**
 * 生成指定长度的随机英文字符串
 * @param {Number} len 字符串长度
 * @param {String} chars 源字符串集合
 * @returns String
 */
function randomString(len = 14, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') {
  const maxPos = chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

module.exports = randomString;
