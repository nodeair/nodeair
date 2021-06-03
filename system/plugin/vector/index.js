const fs = require('fs-extra');
const path = require('path');

async function loaded() {
  const { log, hook, theme, staticServer } = this;
  log.system('加载 vector 插件');
  const VECTOR_NAME = 'vector';
  const state = {
    vue: {
      type: 'script',
      router: '/vector/vue/2.6.12/vue.min.js',
      url: `<%= common.domain %>/vector/vue/2.6.12/vue.min.js`,
      content: fs.readFileSync(path.join(__dirname, 'static/vue/2.6.12/vue.min.js'))
    },
    jquery: {
      type: 'script',
      router: '/vector/jquery/3.6.0/jquery.min.js',
      url: '<%= common.domain %>/vector/jquery/3.6.0/jquery.min.js',
      content: fs.readFileSync(path.join(__dirname, 'static/jquery/3.6.0/jquery.min.js'))
    },
    axios: {
      type: 'script',
      router: '/vector/axios/0.21.1/axios.min.js',
      url: '<%= common.domain %>/vector/axios/0.21.1/axios.min.js',
      content: fs.readFileSync(path.join(__dirname, 'static/axios/0.21.1/axios.min.js'))
    },
    elementUiJs: {
      type: 'script',
      router: '/vector/element-ui/2.15.1/index.js',
      url: '<%= common.domain %>/vector/element-ui/2.15.1/index.js',
      content: fs.readFileSync(path.join(__dirname, 'static/element-ui/2.15.1/index.js'))
    },
    elementUiCss: {
      type: 'css',
      router: '/vector/element-ui/2.15.1/index.css',
      url: '<%= common.domain %>/vector/element-ui/2.15.1/index.css',
      content: fs.readFileSync(path.join(__dirname, 'static/element-ui/2.15.1/index.css'))
    }
  }

  // 调用钩子
  await hook.emit('core.vector.01', state);

  // 注册静态资源服务
  const staticDir = path.join(__dirname, 'static');
  staticServer.register(staticDir, '/vector');
  Object.keys(state).forEach(key => {
    const item = state[key];
    theme.head.push(item.url, item.type);
  });
}

module.exports = loaded;
