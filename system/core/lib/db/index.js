const path = require('path');
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');

class Db {
  constructor(app) {
    this.app = app;
    const { config, __ROOT } = this.app;
    this.sequelize = '';
    if (config.database.type === 'sqlite') {
      const { options } = config.database;
      const dbPath = path.join(__ROOT, options.storage);
      if (!fs.existsSync(dbPath)) fs.ensureFileSync(dbPath);
      this.sequelize = new Sequelize({
        dialect: options.dialect,
        storage: path.join(__ROOT, options.storage)
      });
    }
  }
  /**
   * 判断某个模型是否存在
   */
  async existsModel(Model) {
    const model = Model(this.sequelize);
    try {
      await model.count();
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = Db;
