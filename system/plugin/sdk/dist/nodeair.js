(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.NodeAir = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * 生成指定长度的随机字符串
   * @param {Number} length 字符串长度
   * @returns {String}
   */
  function randomString(length) {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
    var result = '';

    for (var i = length; i > 0; --i) {
      result += str[Math.floor(Math.random() * str.length)];
    }

    return result;
  }

  var util = {
    randomString: randomString
  };

  /**
   * 密码
   * 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  function isPassword(str) {
    var reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return reg.test(str);
  }
  /**
   * 是否是用户名
   * 4到16位（字母，数字，下划线，减号）
   * @param {String} str 字符串
   * @returns {Boolean}
   */


  function isUsername(str) {
    var reg = /^[a-zA-Z0-9_-]{4,16}$/;
    return reg.test(str);
  }
  /**
   * 是否是邮箱
   * @param {String} str 字符串
   * @returns {Boolean}
   */


  function isEmail(str) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(str);
  }
  /**
   * 是否是手机号码（中国）
   * @param {String} str 字符串
   * @returns {Boolean}
   */


  function isChinaPhone(str) {
    var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    return reg.test(str);
  }
  /**
   * 是否是IP
   * @param {String} str 字符串
   * @returns {Boolean}
   */


  function isIP(str) {
    var reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return reg.test(str);
  }
  /**
   * 是否是端口号
   * @param {String} str 字符串
   * @returns {Boolean}
   */


  function isPort(port) {
    if (/^[1-9]\d*|0$/.test(port) && port * 1 >= 0 && port * 1 <= 65535) {
      return true;
    }

    return false;
  }

  var validator = {
    isPassword: isPassword,
    isUsername: isUsername,
    isEmail: isEmail,
    isChinaPhone: isChinaPhone,
    isIP: isIP,
    isPort: isPort
  };

  var NodeAir = function NodeAir() {
    _classCallCheck(this, NodeAir);
  };

  NodeAir.util = util;
  NodeAir.validator = validator;

  return NodeAir;

})));
//# sourceMappingURL=nodeair.js.map
