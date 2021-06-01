const path = require('path');
const fs = require('fs-extra');
const NodeAir = require('../core');

/**
 * 卸载程序
 * 谨慎操作，会清空所有数据
 */
async function uninstall() {
  // 实例化
  const app = new NodeAir();
  // 检测数据库是否连接
  const isConnected = await app.db.checkConnected();
  if (!isConnected) {
    app.log.error('数据库连接失败');
    process.exit(0);
  }
  const { constant } = app
  const { ROOT, USER_CONFIG_PATH } = constant;
  // 去掉 app run 插件
  app.conf._defaultConfig.systemPluginOrder = app
    .conf
    ._defaultConfig
    .systemPluginOrder
    .filter(pluginName => pluginName !== 'run');
  app.config.systemPluginOrder = app
    .config
    .systemPluginOrder
    .filter(pluginName => pluginName !== 'run');
  // 初始化
  await app.init();
  const { db, config } = app;
  // 移除所有表
  await db.model.dropAll();
  // 如果数据库类型是 sqlite 则删除对应的文件
  if (config.database.type === 'sqlite') {
    const dbPath = path.join(ROOT, config.database.options.storage);
    fs.removeSync(dbPath);
  }
  // 删除用户配置文件
  fs.removeSync(USER_CONFIG_PATH);
  // 修改 install 插件的启用状态
  const { plugin } = app;
  plugin.modifyConfig('@nodeair/plugin-core-install', {
    enable: true
  });
  // 退出程序
  process.exit(0);
}

uninstall();

module.exports = uninstall;
