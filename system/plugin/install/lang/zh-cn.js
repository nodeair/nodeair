module.exports = function () {
  const { APP_NAME } = this;
  return {
    '系统检测到您还未安装APP_NAME': `系统检测到您还未安装${APP_NAME}`,
    '点击此处进行安装': '点击此处进行安装'
  }
}
