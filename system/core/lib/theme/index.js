const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');

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
    this.ejs = ejs;
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
    await this._emitThemeHook('loaded');
    this._getTplPath();
    this._initThemeStaticRes();
  }
  /**
   * 渲染
   * @param {Object} options 参数
   */
  async render(options = {}) {
    const { pageName, data, ctx } = options;
    const { ejs, app, tplPath } = this;
    const { constant, cache, config, util, hook, lang } = app;
    if (config.cache.enable === true) {
      const { isExpired, value: cachePath } = cache.get({ pageName, data });
      if (cachePath && fs.existsSync(cachePath)) {
        await fs.readFile(cachePath, 'utf8');
        if (isExpired && cachePath) {
          fs.unlinkSync(cachePath);
        } else if (!isExpired && cachePath) {
          const html = await fs.readFile(cachePath);
          ctx.set('Content-Type', 'text/html; charset=utf-8');
          ctx.body = html;
          return html;
        }
      }
    }

    await this._emitThemeHook('beforeMount');
    const state = {
      filePath: tplPath[pageName],
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

    // 判断是否启用了缓存
    if (config.cache.enable === true) {
      const { CACHE_DIR } = constant;
      const fileName = uuidv4();
      const filePath = path.join(CACHE_DIR, fileName);
      fs.writeFileSync(filePath, state.html)
      cache.set({ pageName, data }, filePath);
    }

    // 返回html
    return state.html;
  }
  /**
   * 触发当前主题的生命周期
   */
  async _emitThemeHook(name) {
    const { basedir, package: packageJson } = this.currentTheme;
    const indexPath = path.join(basedir, packageJson.main);
    const object = require(indexPath);
    const hookFn = object[name];
    return await hookFn.call(this.app);
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
