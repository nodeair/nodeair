const fs = require('fs-extra');
const path = require('path');

async function loaded() {
  const { router, theme, hook } = this;
  const HOOK_NAMESPACE = 'system/plugin/sdk/loaded';

  const state = {
    nodeair: {
      type: 'script',
      router: '/vector/nodeair/nodeair.min.js',
      url: '<%= common.base %>/vector/nodeair/nodeair.min.js',
      content: fs.readFileSync(path.join(__dirname, 'dist/nodeair.min.js'))
    }
  }

  // 调用钩子
  await hook.emit(HOOK_NAMESPACE, 1, state);

  // 监听路由
  router.pushOne('GET', state.nodeair.router, function (ctx) {
    ctx.set('Content-Type', 'application/javascript; charset=utf-8');
    ctx.body = state.nodeair.content;
  });

  // 注入到所有页面的头部
  theme.head.push(state.nodeair.url, state.nodeair.type);
}

module.exports = loaded;
