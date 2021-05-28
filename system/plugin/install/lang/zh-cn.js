module.exports = function () {
  const { constant } = this;
  return {
    '系统检测到您还未安装APP_NAME': `系统检测到您还未安装${constant.APP_NAME}`,
    '点击此处进行安装': '点击此处进行安装'
  }
}
