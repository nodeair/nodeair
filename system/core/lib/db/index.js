const path = require('path');
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

class Db {
  constructor(app) {
    this.app = app;
    this.init();
  }
  /**
   * 初始化
   */
  init() {
    const { conf, config, constant } = this.app;
    const { ROOT } = constant;
    if (!conf.isUserExists()) return;
    this.sequelize = this._connect();
  }
  /** 
   * 检测数据库是否连接成功
   */
  async isConnected() {
    const { log } = this.app;
    if (!this.sequelize) return false;
    try {
      await this.sequelize.authenticate();
      log.system('Connection has been established successfully.');
      return true;
    } catch (error) {
      log.system('Unable to connect to the database:', error);
      return false;
    }
  }
  /**
   * 连接数据库
   */
  _connect() {
    const { config, constant } = this.app;
    const { ROOT } = constant;
    const { type, options } = config.database;
    switch(type) {
      case 'sqlite':
        const dbPath = path.join(ROOT, options.storage);
        if (!fs.existsSync(dbPath)) fs.ensureFileSync(dbPath);
        return new Sequelize({
          dialect: options.dialect,
          storage: dbPath
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
   * 判断某个模型是否存在
   */
  async existsModel(Model) {
    if (!this.sequelize || !Model) return false; 
    const model = Model(this.sequelize);
    try {
      let count = await model.count();
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = Db;
