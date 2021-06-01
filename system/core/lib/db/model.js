/**
 * 模型类
 */
class Model {
  constructor(db) {
    this.db = db;
    this.models = {};
    this._models = {};
    this._commonOptions = {
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    };
    this._commonHooks = [
      {
        hookName: 'beforeCreate',
        name: 'insertTime',
        fn(instance) {
          instance.create_time = new Date().getTime();
          instance.update_time = new Date().getTime();
        }
      }
    ]
  }
  /**
   * 添加模型
   */
  push(modelObj) {
    this._initModel(modelObj);
    this._models = Object.assign(this._models, modelObj);
  }
  /**
   * 初始化模型
   */
  _initModel(modelObj) {
    const { sequelize, app } = this.db;
    if (!sequelize) return;
    const { models, _commonOptions, _commonHooks } = this;
    const modelNames = Object.keys(modelObj);
    modelNames.forEach(modelName => {
      const modelFactory = modelObj[modelName];
      if (typeof modelFactory === 'function' && !models[modelName]) {
        const params = modelFactory.call(app);
        const { name, structure, options } = params;
        const model = sequelize.define(name, structure, Object.assign({}, _commonOptions, options));
        _commonHooks.forEach(item => {
          const { hookName, name, fn } = item;
          model.addHook(hookName, name, fn);
        });
        models[modelName] = model;
      }
    });
  }
  /**
   * 建表
   */
  async createAll() {
    return this._batchOp('sync');
  }
  /**
   * 删除所有表
   */
  async dropAll() {
    return this._batchOp('drop');
  }
  /**
   * 对模型批量进行操作
   */
  _batchOp(type) {
    const { sequelize } = this.db;
    if (!sequelize) return false;
    this._initModel(this._models);
    const modelNames = Object.keys(this.models);
    const opResults = [];
    modelNames.forEach(modelName => {
      const model = this.models[modelName];
      opResults.push(model[type]());
    });
    return Promise.all(opResults);
  }
}

module.exports = Model;
