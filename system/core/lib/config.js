const path = require('path');
const fs = require('fs');

/**
 * 配置类
 */
 class Config {
  constructor(app) {
    this.app = app;
    this._config = {};
    this.load();
  }
  /**
   * 加载配置文件
   */
  load() {
    const { __ROOT } = this.app
    const defaultConfigPath = path.join(__ROOT, 'system/config.json');
    const userConfigPath = path.join(__ROOT, 'nodeair.config.json');
    delete require.cache[defaultConfigPath];
    delete require.cache[userConfigPath];
    this._defaultConfig = require(defaultConfigPath);
    this._userConfig = fs.existsSync(userConfigPath) ? require(userConfigPath) : {};
    this._config = this._mergeConfig();
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
   * 合并配置文件
  */
  _mergeConfig() {
    const { _userConfig: userConfig, _defaultConfig: defaultConfig } = this;
    const userKeys = Object.keys(userConfig);
    const defaultKeys = Object.keys(defaultConfig);
    const config = {};
    defaultKeys.forEach(key => {
      const userValue = userConfig[key];
      const defaultValue = defaultConfig[key];
      config[key] = typeof userValue !== 'undefined' ? userValue : defaultValue;
    });
    return config;
  }
}

module.exports = Config;
