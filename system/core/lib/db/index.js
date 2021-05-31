const path = require('path');
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

const Model = require('./model');

class Db {
  constructor(app) {
    this.app = app;
    this.model = new Model(this);
    this.init();
  }
  /**
   * 初始化
   */
  init() {
    const { conf } = this.app;
    if (!conf.isUserExists()) return;
    const config = conf.get();
    this.sequelize = this.connect(config.database);
  }
  /** 
   * 检测数据库是否连接成功
   */
  async checkConnected() {
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
   * 获取所有表名
   * @param {*} Model 
   * @returns 
   */
  async getAllModelName() {
    if (!this.sequelize) return {};
    return this.sequelize.models;
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
  /**
   * 连接数据库
   */
   connect(databaseConfig) {
    const { constant } = this.app;
    const { ROOT } = constant;
    const { type, options } = databaseConfig;
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
}

module.exports = Db;
