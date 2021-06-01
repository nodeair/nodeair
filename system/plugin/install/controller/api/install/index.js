const path = require('path');
const jsonfile = require('jsonfile');
const checkConnected = require('./check-connected');
const userConfigGenerator = require('./config-generator');

/**
 * 安装控制器
 */
async function installController(ctx) {
  const { log, constant, conf, db, router, plugin } = this;
  const { USER_CONFIG_PATH  } = constant;
  // 获取POST请求数据
  log.system('获取POST请求数据');
  const params = ctx.request.body;
  // 生成用户配置
  log.system('生成用户配置');
  const userConfig = userConfigGenerator(params);
  // 检测数据库是否可以连接
  log.system('检测数据库是否可以连接');
  let isConnected = await checkConnected.call(this, userConfig);
  if (!isConnected) {
    ctx.body = { code: 1, msg: '数据库连接失败' };
    return;
  }
  // 将配置信息写入文件
  log.system('将配置信息写入文件');
  jsonfile.writeFileSync(USER_CONFIG_PATH, userConfig, { spaces: 2 });
  // 重新加载用户配置文件
  log.system('重新加载用户配置文件');
  conf.load();
  // 重新初始化数据库
  log.system('重新初始化数据库');
  db.init();
  // 再次判断数据库是否连接成功
  log.system('再次判断数据库是否连接成功');
  isConnected = await db.checkConnected();
  if (!isConnected) {
    ctx.body = { code: 1, msg: '数据库连接失败' };
    return;
  }
  // 建表
  log.system('建表');
  await db.model.createAll();
  // 将用户信息插入到用户表
  const { models } = db.model;
  const { User } = models;
  await User.create({
    nickname: params.manager.nickname,
    username: params.manager.username,
    password: params.manager.password
  });
  // 移除所有和安装有关的路由
  log.system('移除所有和安装有关的路由');
  const routerConfigPath = path.resolve(__dirname, '../../index.js');
  const routerConfig = require(routerConfigPath);
  const routers = await routerConfig(this);
  await router.remove(routers);
  router.removeErrorHandler('installHandler404');
  // 禁用 install 插件
  log.system('禁用 install 插件');
  plugin.modifyConfig('@nodeair/plugin-core-install', { enable: false });
  // 返回结果
  log.system('返回安装结果');
  ctx.body = {
    code: 0,
    msg: '安装完毕，请重新启用程序'
  };
}

module.exports = installController;
