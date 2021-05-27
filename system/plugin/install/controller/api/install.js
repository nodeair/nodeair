const path = require('path');
const jsonfile = require('jsonfile');

async function installController(ctx, next) {
  const { __ROOT, db, conf, router } = this;
  const defaultConfigPath = path.join(__ROOT, 'system/config.json');
  const userConfigPath = path.join(__ROOT, 'nodeair.config.json');
  const pluginBaseDir = path.join(__ROOT, 'system/plugin');
  const PostModel = require(path.join(pluginBaseDir, 'app', 'model/post'));
  const post = PostModel(db.sequelize);

  // 建表
  await post.sync();

  // 获取POST请求数据
  const params = ctx.request.body;

  // 新增配置信息
  const userConfig = {
    debug: false,
    isInstalled: true,
    site: {
      title: params.siteTitle,
      description: params.siteDescription,
      keywords: params.siteKeywords
    },
    database: {
      type: '',
      options: {}
    }
  }
  if (params.databaseType === 'sqlite') {
    userConfig.database.type = 'sqlite';
    userConfig.database.options.dialect = 'sqlite';
    userConfig.database.options.storage = params.databaseOptionsStorage;
  }
  jsonfile.writeFileSync(userConfigPath, userConfig, { spaces: 2 });

  // 重新加载config
  this.conf.load();

  // 移除所有和安装有关的路由
  const installRouterPath = path.resolve(__dirname, '../../router-config');
  const installRouter = require(installRouterPath);
  const routers = installRouter.call(this);
  routers.forEach(item => {
    router.remove(item.type, item.url);
  });

  // 返回结果
  ctx.body = {
    code: 0,
    msg: '安装完毕'
  };
}

module.exports = installController;
