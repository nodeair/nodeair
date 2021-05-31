const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const jsonfile = require('jsonfile');

/**
 * 插件类
 */
class Plugin {
  constructor(app) {
    this.app = app;
    this._systemPlugins = [];
    this._userPlugins = [];
    this._plugins = [];
  }
  /**
   * 初始化
   * @param {*} type 
   * @returns 
   */
  async init() {
    this._userPlugins = await this._load('user');
    this._systemPlugins = await this._load('system');
    this._plugins = [...this._userPlugins, ...this._systemPlugins ];
  }
  /**
   * 通过插件名称修改插件配置
   */
  modifyConfig(name, config = {}, isWriteToFile = true) {
    const { constant } = this.app;
    const { PACKAGE_NAME } = constant;
    const plugin = this._plugins.find(obj => obj.packageJson.name === name);
    Object.keys(config).forEach(key => {
      plugin.packageJson[key] = config[key];
    });
    if (isWriteToFile) {
      const packageJsonPath = path.join(plugin.dir, PACKAGE_NAME);
      jsonfile.writeFileSync(packageJsonPath, plugin.packageJson, { spaces: 2 });
    }
  }
  /**
   * 获取插件加载后的列表
   */
  getPlugins() {
    return _.cloneDeep(this._plugins);
  }
  /**
   * 加载插件
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
      if (fs.existsSync(packagePath)) {
        packageJson = require(packagePath);
        if (packageJson.enable === true) {
          const pluginEntry = require(path.join(dir, plugin, packageJson.main));
          await this._loadPluginEntry(pluginEntry);
        }
      } else {
        const indexPath = path.join(dir, plugin, 'index.js');
        if (fs.existsSync(indexPath)) {
          const pluginEntry = require(indexPath);
          await this._loadPluginEntry(pluginEntry);
        }
      }
      loadedArray.push({
        type,
        dir: pluginDir,
        packageJson: packageJson
      });
    }
    return loadedArray;
  }
  /**
   * 加载插件通过 index.js
   * @param {Function|Object} pluginEntry 入口
   */
  async _loadPluginEntry(pluginEntry) {
    const { app } = this;
    if (typeof pluginEntry === 'function') {
      await pluginEntry.call(app);
    } else if (typeof pluginEntry === 'object') {
      if (typeof pluginEntry.loaded === 'function') {
        await pluginEntry.loaded.call(app);
      }
    }
  }
}

module.exports = Plugin;
