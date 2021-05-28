const path = require('path');
const jsonfile = require('jsonfile');

/**
 * 配置生成
 */
function userConfigGenerator(userConfigPath, params = {}) {
  const { site, database } = params;
  const userConfig = {
    debug: false,
    isInstalled: true,
    site: {
      title: site.title,
      description: site.description,
      keywords: site.keywords
    },
    database: {
      type: '',
      options: {}
    }
  }
  switch (database.type) {
    case 'sqlite':
      userConfig.database.type = database.type;
      userConfig.database.options.dialect = database.type;
      userConfig.database.options.storage = database.optionStorage;
      break;
    case 'postgresql':
    case 'mariadb':
    case 'mssql':
    case 'mysql':
      const type = database.type;
      userConfig.database.type = type;
      userConfig.database.dialect = type === 'postgresql' ? 'postgres' : type;
      userConfig.database.options.host = database.optionHost;
      userConfig.database.options.port = database.optionPort;
      userConfig.database.options.database = database.optionDatabase;
      userConfig.database.options.username = database.optionUsername;
      userConfig.database.options.password = database.password
      break;
  }
  jsonfile.writeFileSync(userConfigPath, userConfig, { spaces: 2 });
}

async function installController(ctx) {
  const { __ROOT, db, router } = this;
  const pluginBaseDir = path.join(__ROOT, 'system/plugin');
  const PostModel = require(path.join(pluginBaseDir, 'app', 'model/post'));
  const post = PostModel(db.sequelize);

  // 获取POST请求数据
  const params = ctx.request.body;

  // 建表
  await post.sync();

  // 生成用户配置文件
  const userConfigPath = path.join(__ROOT, 'nodeair.config.json');
  userConfigGenerator(userConfigPath, params);

  // 重新加载配置文件
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
