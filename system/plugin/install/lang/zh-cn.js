'use strict';

module.exports = function() {
  const { constant } = this;
  return [
    { key: '系统检测到您还未安装APP_NAME', value: `系统检测到您还未安装${constant.APP_NAME}` },
    { key: '点击此处进行安装', value: '点击此处进行安装' },
  ];
};
