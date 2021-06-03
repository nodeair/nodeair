const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');
const { v4: uuidv4 } = require('uuid');

const ejs = require('./ejs');
const htmlUtil = require('./html-util');
const Head = require('./head');

/**
 * 主题生命周期工厂方法
 */
const Hooks = function () {
  return {
    installed: function () { },
    loaded: function () { },
    beforeMount: function() { },
    uninstalled: function () { }
  };
}

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
    await this.emitHook('loaded');
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
    const { config, conf, util, hook, lang } = app;

    // 尝试读取缓存
    const result = await this._readCache(options);
    if (result) return result;

    // 定义渲染参数
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
    
    if (conf.isUserExists()) {
      // 触发主题生命周期
      await this.emitHook('beforeMount', state);
    }

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.01', state);

    // 渲染并返回 HTML 代码
    state.html = await ejs.render(state.filePath, state.renderOptions);

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.02', state);

    // 将头部标签插入到html中
    const $ = cheerio.load(state.html);
    state.html = this.head.insertToHtml($);

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.03', state);

    // 再次渲染
    state.html = ejs.renderStr(state.html, state.renderOptions);

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

    // 设置响应
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = state.html;

    // 调用钩子
    await hook.emit('core.nodeair.theme.render.08', state);

    // 写入缓存
    await this._writeCache(options, state);

    // 返回html
    return state.html;
  }
  /**
   * 写入缓存
   * @param {*} options 
   * @returns 
   */
  async _writeCache(options, state) {
    const { pageName, data } = options;
    const { app } = this;
    const { cache, config, constant } = app;
    if (config.cache.enable === true) {
      const { CACHE_DIR } = constant;
      const fileName = uuidv4();
      const filePath = path.join(CACHE_DIR, fileName);
      await fs.writeFile(filePath, state.html);
      cache.set({ pageName, data }, filePath);
    }
  }
  /**
   * 读取缓存
   */
  async _readCache(options) {
    const { pageName, data, ctx } = options;
    const { app } = this;
    const { cache, config } = app;
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
    return undefined;
  }
  /**
   * 触发当前主题的生命周期
   */
  async emitHook(name, state) {
    const hookFn = this.currentTheme.hooks[name];
    if (typeof hookFn === 'function') {
      await hookFn.call(this.app, state);
    }
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
    const { basedir, package: packageJson } = this.currentTheme;
    const indexPath = path.join(basedir, packageJson.main);
    const themeHooks = require(indexPath);
    const hooks = Hooks();
    this.currentTheme.hooks = Object.assign(hooks, themeHooks);
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
    const { staticServer } = this.app;
    const STATIC_NAME = 'static';
    const STATIC_DIR = path.join(this.currentTheme.basedir, STATIC_NAME);
    staticServer.register(STATIC_DIR, `/${STATIC_NAME}`);
  }
}

module.exports = Theme;
