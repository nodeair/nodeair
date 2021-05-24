const ejs = require('ejs');
const path = require('path');
const fs = require('fs-extra');

/**
 * 主题类
 */
class Theme {
  constructor(app) {
    this.app = app;
    this.theme = this.app.config.theme;
    this._init();
    this._loadTemplate();
    this._initThemeStaticRes();
  }

  /**
   * 渲染
   * @param {*} type 
   * @param {*} data 
   * @returns 
   */
  render(type, data) {
    const head = ejs.render(this.template.head, data);
    const body = ejs.render(this.template[type], data);
    const foot = '';
    return `<!DOCTYPE html>
<html lang="en">
<head>
    ${head}
    <link rel="stylesheet" href="/static/style.css?${new Date().getTime()}" />
    <script src="/static/script.js?${new Date().getTime()}" /></script>
</head>
<body>
  ${body}
  ${foot}
</body>
</html>`
  }

  /**
   * 获取模板内容
   * @param {*} type 
   */
  _getEjsTemplate(type) {
    if (!this.currentTheme.package) {
      console.warn('没有找到你设置的主题！');
      return '';
    }

    const filePath = path.join(this.currentTheme.basedir, this.currentTheme.package.template[type]);
    if (!fs.existsSync(filePath)) return '';
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * 初始化
   * @param {*} type 
   * @param {*} data 
   * @returns 
   */
   _init() {
    const userThemeDir = path.join(this.app.__ROOT, '/theme', this.theme);
    const userThemePackagePath = path.join(userThemeDir, 'package.json');
    const sysThemeDir = path.join(this.app.__ROOT, '/system/theme', this.theme);
    const sysThemePackagePath = path.join(sysThemeDir, 'package.json');
    this.currentTheme = {
      basedir: '',
      package: ''
    };
    if (fs.existsSync(userThemePackagePath)) {
      this.currentTheme.basedir = userThemeDir;
      this.currentTheme.package = require(userThemePackagePath);
    } else if (fs.existsSync(sysThemePackagePath)) {
      this.currentTheme.basedir = sysThemeDir;
      this.currentTheme.package = require(sysThemePackagePath);
    }
  }

  /**
   * 加载模板内容
   */
  _loadTemplate() {
    this.template = {
      index: this._getEjsTemplate('index'),
      head: this._getEjsTemplate('head') 
    }
  }

  /**
   * 初始化主题的静态资源
   */
  _initThemeStaticRes() {
    const staticPath = path.join(this.currentTheme.basedir);
    this.app.koaApp.use(this.app.koaStaticCache(staticPath), {
      filter: ['static']
    });
  }
}

module.exports = Theme;
