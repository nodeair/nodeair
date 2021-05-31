const homeController = require('./controller/home');
const searchController = require('./controller/search');
const postController = require('./controller/post');

async function router(app) {
  const { hook } = app;
  const state = {
    routers: [
      ['GET', '/', homeController],
      ['GET', '/search', searchController],
      ['GET', '/post/:id', postController]
    ]
  };

  // 调用钩子
  await hook.emit('core.app.router.01', state);

  for (const route of state.routers) {
    // 调用钩子
    await hook.emit('core.app.router.02', route);
    const [method, url, controller] = route;
    app.router.push(method, url, controller);
  }
}

module.exports = router;
