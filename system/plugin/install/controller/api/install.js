const path = require('path');
const jsonfile = require('jsonfile');

async function installController(ctx, next) {
  const { __ROOT, db } = this;
  const configPath = path.join(__ROOT, 'system/config.json');
  const pluginBaseDir = path.join(__ROOT, 'system/plugin');
  const PostModel = require(path.join(pluginBaseDir, 'app', 'model/post'));
  const post = PostModel(db.sequelize);

  // 建表
  post.sync();

  // 修改配置信息
  const oldConfig = jsonfile.readFileSync(configPath);
  oldConfig.isInstalled = true;
  jsonfile.writeFileSync(configPath, oldConfig, { spaces: 2 });

  // 返回结果
  ctx.body = {
    code: 0,
    msg: '安装完毕'
  };
}

module.exports = installController;
