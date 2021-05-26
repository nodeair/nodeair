const path = require('path');
const fs = require('fs-extra');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');

const defaultConfig = require('../config');
const userConfPath = '../../nodeair.config.json';
const userConfig = fs.existsSync(userConfPath) ? require(userConfPath) : {};
const config = Object.assign(defaultConfig, userConfig);

const NodeAir = require('../core');
const koaApp = new Koa();
const koaRouter = new KoaRouter();

koaApp.use(koaRouter.routes());

const app = new NodeAir({
  __ROOT: path.join(__dirname, '../../'),
  koaApp,
  koaRouter,
  koaStatic,
  koaStaticCache,
  config
});

async function boot() {
  // 加载用户插件
  await app.loadPlugin(path.join(__dirname, '../../plugin'), config.userPluginOrder);
  // 加载系统插件
  await app.loadPlugin(path.join(__dirname, '../plugin'), config.systemPluginOrder);
  // 初始化
  await app.init();
  // 日志打印
  app.log.system('系统初始化完毕');
}

boot();
