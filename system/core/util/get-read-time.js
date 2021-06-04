/**
 * 日期格式化
 * @param {Number} length 文本长度
 * @returns {Number} 分钟
 */
function getReadTime(length) {
  let readTime = length / 400; 
  readTime = Math.round(readTime);  
  let time = 0;  
  if (readTime > 1) {
    time = readTime;
  } else {
    time = 1;
  }
  return time;
}

module.exports = getReadTime;
