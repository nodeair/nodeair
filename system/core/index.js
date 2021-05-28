/**
 * NodeAir 核心服务
 */
const Util = require('./util');
const Koa = require('./lib/koa');
const Plugin = require('./lib/plugin');
const Config = require('./lib/config');
const Hook = require('./lib/hook');
const Theme = require('./lib/theme');
const Router = require('./lib/router');
const Db = require('./lib/db');
const Lang = require('./lib/lang');
const Log = require('./lib/log');
const constant = require('./constant');

class NodeAir {
  constructor(options = {}) {
    this.constant = constant.call(this);
    this.koa = new Koa(this);
    this.conf = new Config(this);
    this.config = this.conf.get();
    this.plugin = new Plugin(this);
    this.log = new Log(this);
    this.util = new Util(this);
    this.hook = new Hook(this);
    this.lang = new Lang(this);
    this.router = new Router(this);
    this.theme = new Theme(this);
    this.db = new Db(this);
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
