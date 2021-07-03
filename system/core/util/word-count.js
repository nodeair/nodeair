'use strict';

function cnWordCount(data) {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const m = data.match(pattern);
  let count = 0;
  if (m == null) { return count; }
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4E00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

function enWordCount(data) {
  // 替换中文字符为空格
  let value = data.replace(/[\u4e00-\u9fa5]+/g, ' ');
  // 将换行符，前后空格不计算为单词数
  value = value.replace(/\n|\r|^\s+|\s+$/gi, '');
  // 多个空格替换成一个空格
  value = value.replace(/\s+/gi, ' ');
  // 更新计数
  let length = 0;
  const match = value.match(/\s/g);
  if (match) {
    length = match.length + 1;
  } else if (value) {
    length = 1;
  }
  return length;
}

/**
 * 字数统计
 * @param {String} str 文本
 * @param {Number} type 统计类型 1 中文 2 英文
 * @return {Number} 统计数
 */
function wordCount(str, type = 1) {
  switch (type) {
    case 1: return cnWordCount(str);
    case 2: return enWordCount(str);
    default: return 0;
  }
}

module.exports = wordCount;
