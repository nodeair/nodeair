'use strict';

const Widget = require('./widget');
const _ = require('lodash');

/**
 * 侧栏卡片
 */
async function loaded() {
  const { hook, log } = this;
  const HOOK_RENDER = 'system/core/theme/render';
  const widget = new Widget();
  this.widget = widget;
  log.system('加载 widget 插件完毕');
  // 将方法注入到模板引擎
  await hook.on(HOOK_RENDER, 1, async function(state) {
    state.renderOptions.getWidgets = id => {
      const common = _.cloneDeep(state.renderOptions);
      return widget.getWidgets(this, id, common);
    };
  });
}

module.exports = loaded;
