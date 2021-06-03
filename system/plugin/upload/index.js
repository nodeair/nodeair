async function loaded() {
  const { staticServer, log, constant } = this;
  const { UPLOAD_DIR } = constant;
  log.system('加载 upload 插件');
  // 监听 upload 文件夹
  staticServer.register(UPLOAD_DIR, '/upload');
  // koa.app.use(async function (ctx, next) {
  //   // await next();
  //   const temp = ctx.path.substr(0, UPLOAD_NAME.length + 1);
  //   if (temp === `/${UPLOAD_NAME}`) {
  //     const staticMiddleware = await koa.static(ROOT);
  //     await staticMiddleware(ctx, next);
  //   }
  // });
}

module.exports = loaded;
