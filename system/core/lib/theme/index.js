const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');

const ejs = require('./ejs');
const htmlUtil = require('./html-util');
const Head = require('./head');

/**
 * 主题类
 */
class Theme {
  constructor(app) {
    this.app = app;
    this.THEME_NAME = this.app.config.theme;
    this.PACKAGE_NAME = 'package.json';
    this.head = new Head(this);
  }
  /**
   * 初始化
   */
  async init() {
    this._getCurrentTheme();
    this._getTplPath();
    this._initThemeStaticRes();
  }
  /**
   * 渲染
   * @param {Object} options 参数
   */
  async render(options = {}) {
    const { pageName, data, ctx } = options
    const { config, util, common } = this.app;
    const filePath = this.tplPath[pageName];
    const renderOptions =  {
      common: {
        domain: util.parseDomain(ctx.request.host)
      },
      pageData: data
    };
    let html = await ejs.render(filePath, renderOptions); // 渲染返回 HTML 代码
    const $ = cheerio.load(html);
    html = this.head.insertToHtml($);
    html = ejs.renderStr(html, renderOptions); // 再次渲染

    // 判断是否需要美化
    if (config.debug) {
      html = htmlUtil.prettify(html);
    } else {
      // 判断是否需要最小化
      if (config.isMinimize) {
        html = htmlUtil.minify(html);
      }
    }
    ctx.body = html;
  }
  /**
   * 获取当前主题信息
   */
  _getCurrentTheme() {
    const { __ROOT } = this.app;
    const { PACKAGE_NAME, THEME_NAME } = this;
    const userThemeDir = path.join(__ROOT, '/theme', THEME_NAME);
    const userThemePackagePath = path.join(userThemeDir, PACKAGE_NAME);
    const sysThemeDir = path.join(this.app.__ROOT, '/system/theme', THEME_NAME);
    const sysThemePackagePath = path.join(sysThemeDir, PACKAGE_NAME);

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
   * 获取各个模板路径
   */
  _getTplPath() {
    const { basedir, package: packageJson } = this.currentTheme;

    if (!packageJson) {
      console.warn('没有找到你设置的主题！');
    }

    this.tplPath = {
      index: path.join(basedir, packageJson.pages.index),
      search: path.join(basedir, packageJson.pages.search)
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
