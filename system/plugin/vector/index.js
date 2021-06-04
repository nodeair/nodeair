const path = require('path');

async function loaded() {
  const { log, hook, theme, staticServer } = this;
  log.system('加载 vector 插件');
  const VECTOR_NAME = 'vector';
  const state = {
    vue: {
      type: 'script',
      url: `//<%= common.host %>/vector/vue/2.6.12/vue.min.js`
    },
    jquery: {
      type: 'script',
      url: '//<%= common.host %>/vector/jquery/3.6.0/jquery.min.js'
    },
    axios: {
      type: 'script',
      url: '//<%= common.host %>/vector/axios/0.21.1/axios.min.js'
    },
    elementUiJs: {
      type: 'script',
      url: '//<%= common.host %>/vector/element-ui/2.15.1/index.js'
    },
    elementUiCss: {
      type: 'css',
      url: '//<%= common.host %>/vector/element-ui/2.15.1/index.css'
    }
  }

  // 调用钩子
  await hook.emit('system.plugin.vector.01', state);

  // 注册静态资源服务
  const staticDir = path.join(__dirname, 'static');
  staticServer.register(staticDir, '/vector');

  // 将所有 vector 添加到网页的头部
  Object.keys(state).forEach(key => {
    const item = state[key];
    theme.head.push(item.url, item.type);
  });
}

module.exports = loaded;
