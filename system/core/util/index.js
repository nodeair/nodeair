const parseDomain = require('./parse-domain');
const hashPassword = require('./hash-password');
const dateFormat = require('./date-format');
const dateBeautify = require('./date-beautify');
const wordCount = require('./word-count');
const removeHtmlTag = require('./remove-html-tag');
const getReadTime = require('./get-read-time');
const nameToLine = require('./name-to-line');
const randomString = require('./random-string');

/**
 * 工具类
 */
class Util {
  constructor(app) {
    this.app = app;
  }
}

Util.prototype.parseDomain = parseDomain;
Util.prototype.hashPassword = hashPassword;
Util.prototype.dateFormat = dateFormat;
Util.prototype.dateBeautify = dateBeautify;
Util.prototype.wordCount = wordCount;
Util.prototype.removeHtmlTag = removeHtmlTag;
Util.prototype.getReadTime = getReadTime;
Util.prototype.nameToLine = nameToLine;
Util.prototype.randomString = randomString;

module.exports = Util;
