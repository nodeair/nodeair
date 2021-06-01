const path = require('path');

function constant() {
  // 根目录
  const ROOT = path.join(__dirname, '../../');
  // 框架名称
  const APP_NAME = 'NodeAir';
  // 包信息文件名
  const PACKAGE_NAME = 'package.json';
  // 用户配置文件名
  const USER_CONFIG_FILENAME = 'nodeair.config.json';
  // 系统配置文件名
  const SYSTEM_CONFIG_FILENAME = 'config.json';
  // 硬盘缓存索引文件名
  const CACHE_INDEX_FILENAME = 'cache.json';
  // 系统目录名称
  const SYSTEM_NAME = 'system';
  // 插件目录名称
  const PLUGIN_NAME = 'plugin';
  // 主题目录名称
  const THEME_NAME = 'theme';
  // 缓存目录名称
  const CACHE_NAME = 'cache';
  // 用户配置文件路径
  const USER_CONFIG_PATH = path.join(ROOT, USER_CONFIG_FILENAME);
  // 系统配置文件路径
  const SYSTEM_CONFIG_PATH = path.join(ROOT, SYSTEM_NAME, SYSTEM_CONFIG_FILENAME);
  // 用户插件目录
  const USER_PLUGIN_DIR = path.join(ROOT, PLUGIN_NAME);
  // 系统插件目录
  const SYSTEM_PLUGIN_DIR = path.join(ROOT, SYSTEM_NAME, PLUGIN_NAME);
  // 用户主题目录
  const USER_THEME_DIR = path.join(ROOT, THEME_NAME);
  // 系统主题目录
  const SYSTEM_THEME_DIR = path.join(ROOT, SYSTEM_NAME, THEME_NAME);
  // 硬盘缓存目录
  const CACHE_DIR = path.join(ROOT, CACHE_NAME);
  // 硬盘缓存索引文件路径
  const CACHE_INDEX_PATH = path.join(CACHE_DIR, CACHE_INDEX_FILENAME);
  return {
    ROOT,
    APP_NAME,
    PACKAGE_NAME,
    USER_CONFIG_FILENAME,
    SYSTEM_CONFIG_FILENAME,
    CACHE_INDEX_FILENAME,
    SYSTEM_NAME,
    PLUGIN_NAME,
    THEME_NAME,
    CACHE_NAME,
    USER_CONFIG_PATH,
    SYSTEM_CONFIG_PATH,
    USER_PLUGIN_DIR,
    SYSTEM_PLUGIN_DIR,
    USER_THEME_DIR,
    SYSTEM_THEME_DIR,
    CACHE_DIR,
    CACHE_INDEX_PATH
  }
}

module.exports = constant;
