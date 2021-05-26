const parseDomain = require('./parse-domain');
class Util {
  constructor(app) {
    this.app = app;
  }
}

Util.prototype.parseDomain = parseDomain;

module.exports = Util;
