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
    app.log.system('实例化Theme类');
    this.app = app;
    this.THEME_NAME = this.app.config.theme;
    this.PAGES_NAME = [
      'index',
      'search',
      'install',
      'post',
      'not-installed'
    ];
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
    const { config, util, hook, lang } = this.app;
    const state = {
      filePath: this.tplPath[pageName],
      renderOptions: {
        text: function (key) {
          return lang.text(key);
        },
        common: {
          domain: util.parseDomain(ctx.request.host),
          lang: config.lang
        },
        pageData: data
      },
      html: ''
    };

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.01', state);

    state.html = await ejs.render(state.filePath, state.renderOptions); // 渲染返回 HTML 代码

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.02', state);

    const $ = cheerio.load(state.html);
    state.html = this.head.insertToHtml($);

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.03', state);

    state.html = ejs.renderStr(state.html, state.renderOptions); // 再次渲染

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.04', state);

    // 判断是否需要美化
    if (config.debug) {
      state.html = htmlUtil.prettify(state.html);
      // 调用钩子
      await hook.emit('core.nodeair.theme.render.05', state);
    } else {
      // 判断是否需要最小化
      if (config.isMinimize) {
        state.html = htmlUtil.minify(state.html);
        // 调用钩子
        await hook.emit('core.nodeair.theme.render.06', state);
      }
    }

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.07', state);

    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = state.html;

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.08', state);

    return state.html;
  }
  /**
   * 获取当前主题信息
   */
  _getCurrentTheme() {
    const { THEME_NAME } = this;
    const { constant } = this.app;
    const { PACKAGE_NAME, USER_THEME_DIR, SYSTEM_THEME_DIR } = constant;
    const userThemeDir = path.join(USER_THEME_DIR, THEME_NAME);
    const sysThemeDir = path.join(SYSTEM_THEME_DIR, THEME_NAME);
    const userThemePackagePath = path.join(userThemeDir, PACKAGE_NAME);
    const sysThemePackagePath = path.join(sysThemeDir, PACKAGE_NAME);
    this.currentTheme = { basedir: '', package: '' };
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

    // 拼接所需页面路径
    this.tplPath = {};
    this.PAGES_NAME.forEach(name => {
      this.tplPath[name] = path.join(basedir, packageJson.pages[name]);
    });
  }
  /**
   * 初始化主题的静态资源
   */
  _initThemeStaticRes() {
    const { koa } = this.app;
    const staticPath = path.join(this.currentTheme.basedir);
    koa.app.use(koa.staticCache(staticPath), {
      filter: ['static']
    });
  }
}

module.exports = Theme;
