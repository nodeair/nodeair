const fs = require('fs');

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
  _mergeConfig() {
    const { _userConfig: userConfig, _defaultConfig: defaultConfig } = this;
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
