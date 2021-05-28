class Validator {
  constructor(naInstance) {
    this.naInstance = naInstance;
  }
  /**
   * 是否是网名
   * @param {} str 
   * @returns 
   */
  isNickname(str) {
    const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,20}$/;
    const message = {
      'zh-cn': '2到20位，只允许中文、字母和数字'
    }
    const res = reg.test(str);
    return res ? res : message[this.naInstance.lang];
  }
  /**
   * 是否是密码
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  isPassword(str) {
    const reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    const message = {
      'zh-cn': '4到16位，至少包含1个大写字母、1个小写字母、1个数字和1个特殊字符'
    }
    const res = reg.test(str);
    return res ? res : message[this.naInstance.lang];
  }
  /**
   * 是否是用户名
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  isUsername(str) {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/;
    const message = {
      'zh-cn': '4到16位，只允许字母、数字、下划线和减号'
    }
    const res = reg.test(str);
    return res ? res : message[this.naInstance.lang];
  }
  /**
   * 是否是邮箱
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  isEmail(str) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(str);
  }
  /**
   * 是否是手机号码（中国）
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  isChinaPhone(str) {
    const reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    return reg.test(str);
  }
  /**
   * 是否是IP
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  isIP(str) {
    const reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const message = {
      'zh-cn': '请输入正确的IP地址'
    }
    const res = reg.test(str);
    return res ? res : message[this.naInstance.lang];
  }
  /**
   * 是否是端口号
   * @param {String} str 字符串
   * @returns {Boolean}
   */
  isPort(port) {
    const message = {
      'zh-cn': '2到20位，只允许中文、字母和数字'
    }
    if (/^[1-9]\d*|0$/.test(port) && port * 1 >= 0 && port * 1 <= 65535) {
      return true;
    }
    return message[this.naInstance.lang];
  }
}

export default Validator;
