const path = require('path');
const jsonfile = require('jsonfile');

async function installController(ctx, next) {
  const { __ROOT, db } = this;
  const configPath = path.join(__ROOT, 'system/config.json');
  const pluginBaseDir = path.join(__ROOT, 'system/plugin');
  const PostModel = require(path.join(pluginBaseDir, 'app', 'model/post'));
  const post = PostModel(db.sequelize);

  // 建表
  await post.sync();


  // 获取POST请求数据


  // 修改配置信息
  const oldConfig = jsonfile.readFileSync(configPath);
  oldConfig.isInstalled = true;
  oldConfig.site.title = "又一个 NodeAir 站点";
  oldConfig.site.description = "又一个 NodeAir 站点";
  oldConfig.site.keywords = "nodeair站点";
  oldConfig.database.type = "sqlite";
  oldConfig.database.options.dialect = "sqlite";
  oldConfig.database.options.storage = "data/database.sqlite";
  jsonfile.writeFileSync(configPath, oldConfig, { spaces: 2 });

  // 返回结果
  ctx.body = {
    code: 0,
    msg: '安装完毕'
  };
}

module.exports = installController;
