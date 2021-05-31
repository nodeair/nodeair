/**
 * 检查数据库是否连接成功
 */
async function checkConnection(userConfig) {
  const { db } = this;
  db.sequelize = db.connect(userConfig.database);
  return await db.checkConnected();
}

module.exports = checkConnection;
