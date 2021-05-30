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
      userConfig.database.options.password = database.optionPassword;
      break;
  }
  jsonfile.writeFileSync(userConfigPath, userConfig, { spaces: 2 });
}

async function installController(ctx) {
  const { constant, conf, config, db, router } = this;
  const { ROOT, SYSTEM_PLUGIN_DIR, USER_CONFIG_PATH  } = constant;
  // 获取POST请求数据
  const params = ctx.request.body;
  // 生成用户配置文件
  userConfigGenerator(USER_CONFIG_PATH, params);
  // 重新加载用户配置文件
  conf.load();
  // 重新初始化数据库
  db.init();
  // 判断数据库是否连接成功
  const isConnected = await db.isConnected();
  if (!isConnected) {
    ctx.body = { code: 1, msg: '数据库连接失败' };
    return;
  }
  // 建表
  const result = await db.model.createAll();
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
