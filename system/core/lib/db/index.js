'use strict';

const path = require('path');
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

const Model = require('./model');

class Db {
  constructor(app) {
    app.log.system('实例化Db类');
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
      log.success('Connection has been established successfully.');
      return true;
    } catch (error) {
      log.error('Unable to connect to the database:', error);
      return false;
    }
  }
  /**
   * 获取所有表名
   */
  async getAllModelName() {
    if (!this.sequelize) return {};
    return this.sequelize.models;
  }
  /**
   * 判断某个模型是否存在
   */
  async existsModel(modelFactory) {
    if (!this.sequelize || !modelFactory) return false;
    const params = modelFactory(this.app);
    const { name, structure } = params;
    const model = this.sequelize.define(name, structure);
    try {
      await model.count();
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
    const { config } = this.app;
    const { ROOT } = constant;
    const { type, options } = databaseConfig;
    const dbPath = path.join(ROOT, options.storage);
    const { database, username, password, host, port } = options;
    switch (type) {
      case 'sqlite':
        if (!fs.existsSync(dbPath)) fs.ensureFileSync(dbPath);
        return new Sequelize({
          logging: config.debug ? console.log : false,
          dialect: options.dialect,
          storage: dbPath,
        });
      case 'mysql':
        return new Sequelize(database, username, password, {
          logging: config.debug ? console.log : false,
          host,
          port,
          dialectOptions: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            supportBigNumbers: true,
            bigNumberStrings: true,
          },
          define: {
            underscored: true,
          },
          dialect: 'mysql',
        });
      default: return undefined;
    }
  }
}

module.exports = Db;
