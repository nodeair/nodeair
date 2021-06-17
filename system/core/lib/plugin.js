const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const jsonfile = require('jsonfile');

/**
 * 插件生命周期工厂方法
 */
const Hooks = function() {
  return {
    installed: function () { },
    loaded: function () { },
    beforeMount: function () { },
    uninstalled: function () { }
  };
}

/**
 * 插件类
 */
class Plugin {
  constructor(app) {
    app.log.system('实例化Plugin类');
    this.app = app;
    this._systemPlugins = [];
    this._userPlugins = [];
    this._plugins = [];
  }
  /**
   * 初始化
   */
  async init() {
    this._userPlugins = await this._load('user');
    this._systemPlugins = await this._load('system');
    this._plugins = [...this._userPlugins, ...this._systemPlugins];
    await this.emitHook('loaded');
  }
  /**
   * 触发插件的生命周期
   * @param {String} hookName 生命周期名称
   */
  async emitHook(hookName) {
    const {
      app,
      _userPlugins: userPlugins,
      _systemPlugins: systemPlugins
    } = this;
    const emit = async (plugins) => {
      for (let i = 0; i < plugins.length; i++) {
        const item = plugins[i];
        const fn = item.hooks[hookName];
        const { packageJson } = item;
        if (typeof fn === 'function' && packageJson.enable === true) {
          await fn.call(app);
        }
      }
    }
    // 首先触发用户安装的插件
    await emit(userPlugins);
    // 再触发系统自带插件
    await emit(systemPlugins);
  }
  /**
   * 通过插件名称修改插件配置
   */
  modifyConfig(name, config = {}, isWriteToFile = true) {
    const { constant } = this.app;
    const { PACKAGE_NAME } = constant;
    const plugin = this._plugins.find(obj => obj.packageJson.name === name);
    if (!plugin) return;
    Object.keys(config).forEach(key => {
      plugin.packageJson[key] = config[key];
    });
    if (isWriteToFile) {
      const packageJsonPath = path.join(plugin.dir, PACKAGE_NAME);
      jsonfile.writeFileSync(packageJsonPath, plugin.packageJson, { spaces: 2 });
    }
  }
  /**
   * 获取某个插件的信息
   */
  getPlugin(name) {
    return this._plugins.find(obj => obj.packageJson.name === name);
  }
  /**
   * 获取插件加载后的列表
   */
  getPlugins() {
    return _.cloneDeep(this._plugins);
  }
  /**
   * 加载插件
   * @param {String} type 加载插件的类型 user | system
   */
  async _load(type) {
    const { conf, constant } = this.app;
    const { USER_PLUGIN_DIR, SYSTEM_PLUGIN_DIR } = constant;
    let plugins = [];
    let order = [];
    let dir = '';
    switch (type) {
      case 'user':
        dir = USER_PLUGIN_DIR;
        plugins = fs.readdirSync(dir);
        order = conf.get(type).userPluginOrder;
        break;
      case 'system':
        dir = SYSTEM_PLUGIN_DIR;
        plugins = fs.readdirSync(dir);
        order = conf.get(type).systemPluginOrder;
        break;
    }
    return await this._loadPlugin(plugins, order, dir, type);
  }
  /**
   * 通过目录加载插件
   * @param {Array<string>} plugins 插件目录数组
   * @param {Array<string>} order 加载顺序数组
   * @param {string} type 插件类型
   */
  async _loadPlugin(plugins, order, dir, type) {
    const { PACKAGE_NAME } = this.app.constant;
    order = Array.isArray(order) ? order : plugins;
    const loadedArray = [];
    for (const plugin of order) {
      if (!plugins.includes(plugin)) continue;
      const pluginDir = path.join(dir, plugin);
      const packagePath = path.join(pluginDir, PACKAGE_NAME);
      let packageJson = {};
      let mainPath = '';
      let hooks = Hooks();
      if (fs.existsSync(packagePath)) {
        packageJson = require(packagePath);
        mainPath = path.join(dir, plugin, packageJson.main);
      } else {
        mainPath = path.join(dir, plugin, 'index.js');
      }
      if (!fs.existsSync(mainPath)) continue;
      const pluginEntry = require(mainPath);
      if (typeof pluginEntry === 'object') {
        hooks = Object.assign(hooks, pluginEntry);
      } else if (typeof pluginEntry === 'function') {
        hooks.loaded = pluginEntry;
      }
      loadedArray.push({
        type,
        dir: pluginDir,
        packageJson: packageJson,
        hooks
      });
    }
    return loadedArray;
  }
}

module.exports = Plugin;
