'use strict';

const fs = require('fs-extra');
const jsonfile = require('jsonfile');

/**
 * 硬盘缓存
 */
class Cache {
  constructor(app) {
    this.app = app;
  }
  /**
   * 新增缓存
   */
  set(key, value, timeInterval = 60000) {
    const { constant } = this.app;
    const { CACHE_INDEX_PATH } = constant;
    const cacheJson = this.getCache();
    const _key = typeof key === 'object' ? JSON.stringify(key) : key;
    cacheJson.cache[_key] = {
      value,
      createTime: new Date().getTime(),
      timeInterval,
    };
    jsonfile.writeFileSync(CACHE_INDEX_PATH, cacheJson, { spaces: 2 });
  }
  /**
   * 获取缓存
   */
  get(key) {
    const { log } = this.app;
    const cacheJson = this.getCache();
    const _key = typeof key === 'object' ? JSON.stringify(key) : key;
    const cacheItem = cacheJson.cache[_key];
    if (typeof cacheItem === 'object') {
      const { value, createTime, timeInterval } = cacheItem;
      const now = new Date().getTime();
      if (now > createTime + timeInterval) {
        log.system(`缓存 [${_key}] 已过期`);
        this.remove(_key);
        return { isExpired: true, value };
      }
      return { isExpired: false, value };
    }
    return { isExpired: false, value: undefined };
  }
  /**
   * 删除缓存
   * @param {String} key 缓存key
   */
  remove(key) {
    const { constant } = this.app;
    const { CACHE_INDEX_PATH } = constant;
    const cacheJson = this.getCache();
    const _key = typeof key === 'object' ? JSON.stringify(key) : key;
    delete cacheJson.cache[_key];
    jsonfile.writeFileSync(CACHE_INDEX_PATH, cacheJson, { spaces: 2 });
  }
  /**
   * 判断缓存文件是否存在
   */
  getCache() {
    const { constant } = this.app;
    const { CACHE_INDEX_PATH } = constant;
    const defaultJson = {
      cache: {},
    };
    if (!fs.existsSync(CACHE_INDEX_PATH)) {
      fs.ensureFileSync(CACHE_INDEX_PATH);
      fs.writeFileSync(CACHE_INDEX_PATH, JSON.stringify(defaultJson));
      return defaultJson;
    }
    return require(CACHE_INDEX_PATH) || defaultJson;
  }
}

module.exports = Cache;
