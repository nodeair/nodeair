/**
 * 多语言类
 */
class Lang {
  constructor(app) {
    this.app = app;
    this._langText = {
      'zh-cn': {},
      'zh-tw': {},
      'en-us': {}
    };
  }
  /**
   * 注册多语言文案
   */
  register(langObj = {}) {
    Object.keys(langObj).forEach(key => {
      const langSet = this._langText[key]
      if (langSet) {
        this._langText[key] = Object.assign(langSet, langObj[key]);
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
      const _text = langSet[key];
      return _text ? _text : unknownText;
    } else {
      return unknownText;
    }
  }
}

module.exports = Lang;
