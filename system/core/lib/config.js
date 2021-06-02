const fs = require('fs');
const jsonfile = require('jsonfile');

/**
 * 配置类
 */
 class Config {
  constructor(app) {
    app.log.system('实例化Config类');
    this.app = app;
    this._config = {};
    this.load();
  }
  /**
   * 加载配置文件
   */
  load() {
    const { constant } = this.app;
    const { USER_CONFIG_PATH, SYSTEM_CONFIG_PATH } = constant;
    delete require.cache[USER_CONFIG_PATH];
    delete require.cache[SYSTEM_CONFIG_PATH];
    this._defaultConfig = this.isSystemExists() ? require(SYSTEM_CONFIG_PATH) : {};
    this._userConfig = this.isUserExists() ? require(USER_CONFIG_PATH) : {};
    this._config = this._mergeConfig(this._defaultConfig, this._userConfig);
    this.app.config = this.get();
  }
  /**
   * 获取配置信息
   */
  get(type) {
    switch (type) {
      case 'user': return this._userConfig;
      case 'system': return this._defaultConfig;
      default: return this._config; 
    }
  }
  /**
   * 修改用户配置信息
   */
  modifyUserConfig(configObject) {
    const { constant } = this.app;
    const { USER_CONFIG_PATH } = constant;
    this._userConfig = this._mergeConfig(this._userConfig, configObject);
    jsonfile.writeFileSync(USER_CONFIG_PATH, this._userConfig, { spaces: 2 });
    this._config = this._mergeConfig(this._defaultConfig, this._userConfig);
  }
  /**
   * 检测用户配置文件是否存在
   */
  isUserExists() {
    const { constant } = this.app;
    const { USER_CONFIG_PATH } = constant;
    return fs.existsSync(USER_CONFIG_PATH);
  }
  /**
   * 检测系统配置文件是否存在
   */
  isSystemExists() {
    const { constant } = this.app;
    const { SYSTEM_CONFIG_PATH } = constant;
    return fs.existsSync(SYSTEM_CONFIG_PATH);
  }
  /**
   * 合并配置文件
  */
  _mergeConfig(sourceConfig, mergeConfig) {
    const sourceKeys = Object.keys(sourceConfig);
    if (sourceKeys.length === 0) return mergeConfig;
    const newConfig = {};
    sourceKeys.forEach(key => {
      const mergeValue = mergeConfig[key];
      const sourceValue = sourceConfig[key];
      newConfig[key] = typeof mergeValue !== 'undefined' ? mergeValue : sourceValue;
    });
    return newConfig;
  }
}

module.exports = Config;
