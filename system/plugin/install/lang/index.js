'use strict';

const zhCn = require('./zh-cn');

module.exports = function() {
  return {
    'zh-cn': zhCn.call(this),
  };
};
