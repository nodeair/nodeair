const path = require('path');
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

/**
 * 连接数据库
 */
function connet() {
  const { config, constant } = this.app;
  const { ROOT } = constant;
  const { type, options } = config.database;
  switch(type) {
    case 'sqlite':
      const dbPath = path.join(ROOT, options.storage);
      return new Sequelize({
        dialect: options.dialect,
        storage: path.join(ROOT, options.storage);
      });
    case 'mysql':
      const { database, username, password, host, port } = options;
      return new Sequelize(database, username, password, {
        host,
        port,
        dialect: 'mysql'
      });
  }
  return '';
}

/**
 * 卸载程序
 */
async function uninstall() {
  const constant = require(path.join(__dirname, '../core/constant'));
  const { USER_CONFIG_FILENAME, USER_CONFIG_PATH } = constant;
  const dataPath = path.resolve('data');
  const userConfig = require(USER_CONFIG_PATH);

  // 删除数据库内容
  // fs.removeSync(dataPath);
  // fs.writeFileSync(USER_CONFIG_PATH, '{}', 'utf8');
  console.log('卸载完成');
}

uninstall();

module.exports = uninstall;
