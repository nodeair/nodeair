/**
 * NodeAir 核心服务
 */
const loadPlugin = require('./public/load-plugin');
const Util = require('./util');
const Hook = require('./lib/hook');
const Theme = require('./lib/theme');
const Router = require('./lib/router');
const Db = require('./lib/db');

class NodeAir {
  constructor(options = {}) {
    this.__ROOT = options.__ROOT;
    this.koaApp = options.koaApp;
    this.koaRouter = options.koaRouter;
    this.koaStatic = options.koaStatic;
    this.koaStaticCache = options.koaStaticCache;
    this.config = options.config;
    this.util = new Util(this);
    this.hook = new Hook(this);
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
