'use strict';

const path = require('path');
const Util = require('./util');
const Cache = require('./lib/cache');
const Koa = require('./lib/koa');
const Plugin = require('./lib/plugin');
const Config = require('./lib/config');
const Hook = require('./lib/hook');
const Theme = require('./lib/theme');
const Router = require('./lib/router');
const Db = require('./lib/db');
const Lang = require('./lib/lang');
const Log = require('./lib/log');
const Service = require('./lib/service');
const constant = require('./constant');

/**
 * NodeAir 核心服务
 */
class NodeAir {
  constructor(options = {}) {
    this.env = options.env || 'dev';
    this.constant = constant.call(this);
    this.log = new Log(this);
    this.cache = new Cache(this);
    this.koa = new Koa(this);
    this.conf = new Config(this);
    this.plugin = new Plugin(this);
    this.util = new Util(this);
    this.hook = new Hook(this);
    this.lang = new Lang(this);
    this.router = new Router(this);
    this.theme = new Theme(this);
    this.db = new Db(this);
    this.service = new Service(this);
    this.copyright = this.getCopyright();
  }
  /**
   * 获取版本号
   */
  getVersion() {
    const { ROOT } = this.constant;
    const packageJson = require(path.join(ROOT, 'package.json'));
    return packageJson.version;
  }
  /**
   * 获取版权信息
   */
  getCopyright() {
    const { config } = this;
    const version = this.getVersion();
    return config.copyright.replace('{version}', version);
  }
  /**
   * 初始化
   */
  async init() {
    // 初始化插件
    await this.plugin.init();
    // 初始化主题
    await this.theme.init();
  }
}

module.exports = NodeAir;
