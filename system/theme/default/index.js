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
  const categories = await service.call(SERVICE_NAMESPACE, 'getAllCategories');
  const links = await service.call(SERVICE_NAMESPACE, 'getOption', { key: 'links' });
  const tags = await service.call(SERVICE_NAMESPACE, 'getTags');
  const archives = await service.call(SERVICE_NAMESPACE, 'getArchives');
  const posts = await service.call(SERVICE_NAMESPACE, 'getPosts', { order: [['post_time', 'DESC']] });
  this.widget.addData('index-left', 'profile', managers[0]);
  this.widget.addData('index-left', 'categories', { name: '文章分类', categories });
  this.widget.addData('index-right', 'recent-post', { name: '最新文章', posts });
  this.widget.addData('index-right', 'archives', { name: '文章归档', archives });
  this.widget.addData('index-right', 'tags', { name: '文章标签', tags });
  this.widget.addData('index-left', 'links', { name: '链接', links,
    getDomain(link) {
      try {
        let url = new URL(link.url);
        return url.host;
      } catch (e) {
        return 'unknown';
      }
    }
  });
}

module.exports = {
  installed() {},
  loaded,
  beforeMount,
  uninstalled() {}
};
