/**
 * NodeAir 核心服务
 */
const loadPlugin = require('./public/load-plugin');
const Hook = require('./lib/hook');
const Theme = require('./lib/Theme');
const Router = require('./lib/router');

class NodeAir {
    constructor(options = {}) {
        this.__ROOT = options.__ROOT;
        this.koaApp = options.koaApp;
        this.koaRouter = options.koaRouter;
        this.koaStatic = options.koaStatic;
        this.koaStaticCache = options.koaStaticCache;
        this.config = options.config;
        this.hook = new Hook(this);
        this.theme = new Theme(this);
        this.router = new Router(this);
    }
}

NodeAir.prototype.loadPlugin = loadPlugin;

module.exports = NodeAir;
