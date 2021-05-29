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
  
  const { db } = app;
  const isConnected = await db.isConnected();
  const modelNames = await db.getAllModelName();
  // 移除所有表
  for (const key in modelNames) {
    if (modelNames.hasOwnProperty.call(modelNames, key)) {
      const model = modelNames[key];
      await model.drop();
    }
  }

  // 删除用户配置文件
  const { constant } = app
  const { USER_CONFIG_PATH  } = constant;
  fs.removeSync(USER_CONFIG_PATH);

  // 退出程序
  process.exit(0);
}

uninstall();

module.exports = uninstall;
