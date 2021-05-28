const Koa = require('koa');
const koaStatic = require('koa-static');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBodyparser = require('koa-bodyparser');

const koaApp = new Koa();
const koaRouter = new KoaRouter();

koaApp.use(koaBodyparser());
koaApp.use(koaRouter.routes());

/**
 * KOA封装类
 */
class NodeAirKoa {
  constructor(app) {
    this.nodeairApp = app;
    this.app = koaApp;
    this.router = koaRouter;
    this.static = koaStatic;
    this.staticCache = koaStaticCache;
  }
}

module.exports = NodeAirKoa;
