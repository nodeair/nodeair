/**
 * NodeAir 核心服务
 */
const loadPlugin = require('./public/load-plugin');
const Util = require('./util');
const Config = require('./lib/config');
const Hook = require('./lib/hook');
const Theme = require('./lib/theme');
const Router = require('./lib/router');
const Db = require('./lib/db');
const Lang = require('./lib/lang');
const Log = require('./lib/log');
const APP_NAME = 'NodeAir';

class NodeAir {
  constructor(options = {}) {
    this.__ROOT = options.__ROOT;
    this.APP_NAME = APP_NAME;
    this.koaApp = options.koaApp;
    this.koaRouter = options.koaRouter;
    this.koaStatic = options.koaStatic;
    this.koaStaticCache = options.koaStaticCache;
    this.conf = new Config(this);
    this.config = this.conf.get();
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
    // 初始化主题
    await this.theme.init();
  }
}

NodeAir.prototype.loadPlugin = loadPlugin;

module.exports = NodeAir;
