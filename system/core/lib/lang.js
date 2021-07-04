'use strict';

/**
 * 多语言类
 */
class Lang {
  constructor(app) {
    app.log.system('实例化Lang类');
    this.app = app;
    this._langText = {
      'zh-cn': [],
      'zh-tw': [],
      'en-us': [],
    };
  }
  /**
   * 注册多语言文案
   */
  register(langObj = {}) {
    Object.keys(langObj).forEach(langKey => {
      const langSet = this._langText[langKey];
      if (langSet) {
        this._langText[langKey] = this._langText[langKey].concat(langObj[langKey]);
      }
    });
  }
  /**
   * 获取文案内容
   */
  text(key, langCode) {
    const unknownText = 'unknown text';
    if (!key) return unknownText;
    const { config } = this.app;
    langCode = langCode ? langCode : config.lang;
    const langSet = this._langText[langCode];
    if (langSet) {
      const item = langSet.find(item => item.key === key);
      const _text = item.value;
      return _text ? _text : unknownText;
    }
    return unknownText;
  }
}

module.exports = Lang;
