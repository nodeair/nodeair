'use strict';

const Koa = require('koa');
const koaSession = require('koa-session');
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
koaApp.keys = [ new Date().getTime() ];
koaApp.use(koaSession({
  key: 'koa:sess', // cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, // 是否可以overwrite (默认default true)
  httpOnly: true, // cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, // 签名默认true
  rolling: false, // 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, // (boolean) renew session when session is nearly expired,
}, koaApp));

/**
 * KOA封装类
 */
class NodeAirKoa {
  constructor(app) {
    app.log.system('实例化Koa类');
    this.nodeairApp = app;
    this.app = koaApp;
    this.middleware = {
      session: koaSession,
      router: koaRouter,
      static: koaStatic,
      staticCache: koaStaticCache,
      send: koaSend,
    };
    this.staticServer = new Static(this);
    app.staticServer = this.staticServer;
  }
}

module.exports = NodeAirKoa;
