const Koa = require('koa');
const koaStatic = require('koa-static');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBodyparser = require('koa-bodyparser');
const koaSend = require('koa-send');
const Static = require('./staticServer');

const koaApp = new Koa();
const koaRouter = new KoaRouter();

koaApp.use(koaBodyparser());
koaApp.use(koaRouter.routes());

/**
 * KOA封装类
 */
class NodeAirKoa {
  constructor(app) {
    app.log.system('实例化Koa类');
    this.nodeairApp = app;
    this.app = koaApp;
    this.middleware = {
      router: koaRouter,
      static: koaStatic,
      staticCache: koaStaticCache,
      send: koaSend
    };
    this.staticServer = new Static(this);
    app.staticServer = this.staticServer;
  }
}

module.exports = NodeAirKoa;
