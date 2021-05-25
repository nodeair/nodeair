const path = require('path');
const jsonfile = require('jsonfile');

async function loaded() {
  const { koaRouter, config, hook, db, __ROOT } = this;
  const configPath = path.join(__ROOT, 'system/config.json');
  const confiIsInstalled = config.isInstalled;
  const pluginBaseDir = path.join(__dirname, '../');
  const PostModel = require(path.join(pluginBaseDir, 'app', 'model/post'));
  const isModelExist = await db.existsModel(PostModel);
  const isInstalled = confiIsInstalled && isModelExist;
  if (!isInstalled) {
    koaRouter.get('/install', function(ctx, next) {
      ctx.set('Content-Type', 'text/html; charset=utf-8');
      ctx.body = `安装界面 <a href="/api/install">点击安装</a>`;
    });
    koaRouter.get('/api/install', function(ctx, next) {
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
    });
    koaRouter.get('(/|.*)', function(ctx, next) {
      ctx.body = '你还未安装 NodeAir';
    });
  }
}

module.exports = loaded;
