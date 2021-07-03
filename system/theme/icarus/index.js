'use strict';

const path = require('path');

/**
 * 获取域名
 * @param {String} link 网址
 * @return {String} 域名
 */
function getDomain(link) {
  try {
    const url = new URL(link.url);
    return url.host;
  } catch (e) {
    return 'unknown';
  }
}

/**
 * 主题加载完成
 */
async function loaded() {
  const ejsDir = path.join(__dirname, 'template/widgets');
  // 注册侧栏小工具
  this.widget.register({
    'index-left': {
      ejsDir,
      widgets: [ 'profile', 'links', 'categories' ],
    },
    'index-right': {
      ejsDir,
      widgets: [ 'recent-post', 'archives', 'tags' ],
    },
  });
}

/**
 * 主题每次进行渲染之前
 */
async function beforeMount() {
  const { service, plugin } = this;
  const { packageJson } = plugin.getPlugin('@nodeair/plugin-core-app');
  const { SERVICE_NAMESPACE } = packageJson.constant;
  const s = (prefix, serviceName, params = {}) => service.call(`${SERVICE_NAMESPACE}/${prefix}`, serviceName, params);
  const managers = await s('user', 'getManagers');
  const categories = await s('category', 'getAllCategories');
  const links = await s('option', 'getOption', { key: 'links' });
  const tags = await s('tag', 'getTags');
  const archives = await s('archive', 'getArchives');
  const posts = await s('post', 'getPosts', { order: [[ 'post_time', 'DESC' ]] });
  const profileData = {
    name: '站长简介',
    manager: managers[0],
    postCount: await s('post', 'getPostCount'),
    cateCount: await s('category', 'getCateCount'),
    tagCount: await s('tag', 'getTagCount'),
  };
  this.widget.addData('index-left', 'profile', profileData);
  this.widget.addData('index-left', 'categories', { name: '文章分类', categories });
  this.widget.addData('index-right', 'recent-post', { name: '最新文章', posts });
  this.widget.addData('index-right', 'archives', { name: '文章归档', archives });
  this.widget.addData('index-right', 'tags', { name: '文章标签', tags });
  this.widget.addData('index-left', 'links', { name: '链接', links, getDomain });
}

module.exports = {
  installed() {},
  loaded,
  beforeMount,
  uninstalled() {},
};
