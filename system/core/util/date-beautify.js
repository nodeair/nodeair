/**
 * 日期美化
 * @param {Number} timestamp 时间戳
 * @returns {String} 美化之后的日期
 */
function dateBeautify(timestamp) {
  let dateTimeStamp = timestamp;
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let year = month * 12;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  let result = ''
  if (diffValue < 0) return;
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let yearC = diffValue / year
  if (yearC >= 1) return `${parseInt(yearC)}年前`;
  if (monthC >= 1) {
    result = `${parseInt(monthC)}月前`;
  } else if (weekC >= 1) {
    result = `${parseInt(weekC)}周前`;
  } else if (dayC >= 1) {
    result = `${parseInt(dayC)}天前`;
  } else if (hourC >= 1) {
    result = `${parseInt(hourC)}小时前`;
  } else if (minC >= 1) {
    result = `${parseInt(minC)}分钟前`;
  } else {
    result = '刚刚';
  }
  return result;
}

module.exports = dateBeautify;
