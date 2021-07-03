'use strict';

/**
 * 检查数据库是否连接成功
 * @param {Object} userConfig 用户配置信息
 */
async function checkConnection(userConfig) {
  const { db } = this;
  db.sequelize = db.connect(userConfig.database);
  return await db.checkConnected();
}

module.exports = checkConnection;
