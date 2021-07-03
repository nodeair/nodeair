'use strict';

const path = require('path');

/**
 * 检查 NodeAir 是否安装
 * @param {NodeAir} app NodeAir实例
 * @return {Boolean} true/false
 */
async function checkInstalled(app) {
  const { constant, conf, config, db } = app;
  const { SYSTEM_PLUGIN_DIR } = constant;
  const confiIsInstalled = config.isInstalled;
  // 首先检测用户配置文件是否存在
  if (!conf.isUserExists()) return false;
  // 检测数据库是否连接成功
  const isConnected = await db.checkConnected();
  if (!isConnected) return false;
  const UserModel = require(path.join(SYSTEM_PLUGIN_DIR, 'app', 'model/user'));
  const isModelExist = await db.existsModel(UserModel);
  return confiIsInstalled && isModelExist;
}

module.exports = checkInstalled;
