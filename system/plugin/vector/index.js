const fs = require('fs-extra');
const path = require('path');

async function loaded() {
  const { hook, theme, router, koaApp, koaStaticCache } = this;
  const state = {
    vue: {
      type: 'script',
      router: '/vector/vue/2.6.12/vue.min.js',
      url: `<%= common.domain %>/vector/vue/2.6.12/vue.min.js`,
      content: fs.readFileSync(path.join(__dirname, 'vector/vue/2.6.12/vue.min.js'))
    },
    jquery: {
      type: 'script',
      router: '/vector/jquery/3.6.0/jquery.min.js',
      url: '<%= common.domain %>/vector/jquery/3.6.0/jquery.min.js',
      content: fs.readFileSync(path.join(__dirname, 'vector/jquery/3.6.0/jquery.min.js'))
    },
    axios: {
      type: 'script',
      router: '/vector/axios/0.21.1/axios.min.js',
      url: '<%= common.domain %>/vector/axios/0.21.1/axios.min.js',
      content: fs.readFileSync(path.join(__dirname, 'vector/axios/0.21.1/axios.min.js'))
    },
    elementUiJs: {
      type: 'script',
      router: '/vector/element-ui/2.15.1/index.js',
      url: '<%= common.domain %>/vector/element-ui/2.15.1/index.js',
      content: fs.readFileSync(path.join(__dirname, 'vector/element-ui/2.15.1/index.js'))
    },
    elementUiCss: {
      type: 'css',
      router: '/vector/element-ui/2.15.1/index.css',
      url: '<%= common.domain %>/vector/element-ui/2.15.1/index.css',
      content: fs.readFileSync(path.join(__dirname, 'vector/element-ui/2.15.1/index.css'))
    }
  }

  // 调用钩子
  await hook.emit('core.vector.01', state);

  // 监听路由
  Object.keys(state).forEach(key => {
    const item = state[key];
    theme.head.push(item.url, item.type);
    router.push('GET', item.router, function (ctx, next) {
      let contentType = '';
      if (item.type === 'css') {
        contentType = 'text/css; charset=utf-8';
      } else if (item.type === 'script') {
        contentType = 'application/javascript; charset=utf-8';
      }
      ctx.set('Content-Type', contentType);
      ctx.body = item.content;
    });
  });

  // 监听静态文件
  koaApp.use(koaStaticCache(__dirname), {
    filter: ['vector']
  });
}

module.exports = loaded;
