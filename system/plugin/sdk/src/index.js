import Util from './util';
import Validator from './validator';

/**
 * NodeAir 前端 SDK
 */
class NodeAir {
  constructor() {
    this.lang = this._getSiteLang();
    this.util = new Util(this);
    this.validator = new Validator(this);
  }
  /**
   * 获取网站语言
   */
  _getSiteLang() {
    if (document && document.querySelector('html')) {
      let lang = document.querySelector('html').getAttribute('lang') || 'zh-cn';
      return lang.toLowerCase();
    } else {
      return 'zh-cn';
    }
  }
}

export default NodeAir;
