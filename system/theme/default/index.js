const path = require('path');

/**
 * 主题加载完成
 */
async function loaded() {
  const ejsDir = path.join(__dirname, 'template/widgets');
  // 注册侧栏小工具
  this.widget.register({
    'index-left': {
      ejsDir,
      widgets: ['profile', 'links', 'categories']
    },
    'index-right': {
      ejsDir,
      widgets: ['recent-post', 'archives', 'tags']
    }
  });
}

/**
 * 主题每次进行渲染之前
 */
async function beforeMount() {
  const { service } = this;
  const SERVICE_NAMESPACE = 'system/plugin/app';
  const managers = await service.call(SERVICE_NAMESPACE, 'getManagers');
  this.widget.addData('index-left', 'profile', managers[0]);
  this.widget.addData('index-left', 'links', {
    name: '链接'
  });
  this.widget.addData('index-left', 'categories', {
    name: '文章分类',
    categories: await service.call(SERVICE_NAMESPACE, 'getAllCategories')
  });
  this.widget.addData('index-right', 'recent-post', {
    name: '最新文章'
  });
  this.widget.addData('index-right', 'archives', {
    name: '文章归档'
  });
  this.widget.addData('index-right', 'tags', {
    name: '文章标签'
  });
}

module.exports = {
  installed() {},
  loaded,
  beforeMount,
  uninstalled() {}
};
