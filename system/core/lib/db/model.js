/**
 * 模型类
 */
class Model {
  constructor(db) {
    this.db = db;
    this._models = {};
  }
  /**
   * 添加模型
   */
  push(modelObj) {
    this._models = Object.assign(this._models, modelObj);
  }
  /**
   * 建表
   */
  async createAll() {
    const { sequelize } = this.db;
    if (!sequelize) return false;
    const modelNames = Object.keys(this._models);
    const models = [];
    modelNames.forEach(modelName => {
      const model = this._models[modelName](sequelize);
      models.push(model.sync());
    });
    return Promise.all(models);
  }
  /**
   * 删除所有表
   */
   async removeAll() {
    const { sequelize } = this.db;
    if (!sequelize) return false;
    const modelNames = Object.keys(this._models);
    const models = [];
    modelNames.forEach(modelName => {
      const model = this._models[modelName](sequelize);
      models.push(model.drop());
    });
    return Promise.all(models);
  }
}

module.exports = Model;
