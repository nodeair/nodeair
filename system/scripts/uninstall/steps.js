'use strict';

const path = require('path');
const fs = require('fs-extra');
const NodeAir = require('../../core');

const steps = [
  [
    '初始化',
    async function() {
      this.app = new NodeAir();
    },
  ],
  [
    '检测数据库是否连接',
    async function() {
      const { app } = this;
      const isConnected = await app.db.checkConnected();
      if (!isConnected) {
        app.log.error('数据库连接失败');
        process.exit(0);
      }
    },
  ],
  [
    '从插件列表中去掉【run】插件',
    async function() {
      const { app } = this;
      app.conf._defaultConfig.systemPluginOrder = app
        .conf
        ._defaultConfig
        .systemPluginOrder
        .filter(pluginName => pluginName !== 'run');
      app.config.systemPluginOrder = app
        .config
        .systemPluginOrder
        .filter(pluginName => pluginName !== 'run');
    },
  ],
  [
    '初始化app实例',
    async function() {
      const { app } = this;
      await app.init();
    },
  ],
  [
    '移除所有表',
    async function() {
      const { app } = this;
      const { db } = app;
      await db.model.dropAll();
    },
  ],
  [
    '如果数据库类型是 sqlite 则删除对应的文件',
    async function() {
      const { app } = this;
      const { config, constant } = app;
      const { ROOT } = constant;
      if (config.database.type === 'sqlite') {
        const dbPath = path.join(ROOT, config.database.options.storage);
        if (fs.existsSync(config.database.options.storage)) {
          fs.removeSync(dbPath);
        }
      }
    },
  ],
  [
    '删除用户配置文件',
    async function() {
      const { app } = this;
      const { constant } = app;
      const { USER_CONFIG_PATH } = constant;
      if (fs.existsSync(USER_CONFIG_PATH)) {
        fs.removeSync(USER_CONFIG_PATH);
      }
    },
  ],
  [
    '删除缓存目录',
    async function() {
      const { app } = this;
      const { constant } = app;
      const { CACHE_DIR } = constant;
      if (fs.existsSync(CACHE_DIR)) {
        fs.removeSync(CACHE_DIR);
      }
    },
  ],
  [
    '删除附件目录',
    async function() {
      const { app } = this;
      const { constant } = app;
      const { UPLOAD_DIR } = constant;
      if (fs.existsSync(UPLOAD_DIR)) {
        fs.removeSync(UPLOAD_DIR);
      }
    },
  ],
  [
    '修改【install】插件的启用状态',
    async function() {
      const { app } = this;
      const { plugin } = app;
      plugin.modifyConfig('@nodeair/plugin-core-install', {
        enable: true,
      });
    },
  ],
  [
    '结束进程',
    async function() {
      process.exit(0);
    },
  ],
];

module.exports = steps;
