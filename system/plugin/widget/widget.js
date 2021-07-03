'use strict';

const path = require('path');
const fs = require('fs-extra');

class Widget {
  constructor() {
    this._widgets = {};
  }
  /**
   * 注册侧边栏
   * @param {Object} widgets 侧边栏对象
   * @return {Boolean} 成功/失败 true/false
   */
  register(widgets = {}) {
    if (typeof widgets === 'object' && !Array.isArray(widgets)) {
      this._widgets = Object.assign(this._widgets, widgets);
      return true;
    }
    return false;
  }
  /**
   * 给侧边栏添加数据
   * @param {*} id 页面ID
   * @param {*} widgetName 侧栏卡片名称
   * @param {*} data 数据
   */
  addData(id, widgetName = 'default', data = {}) {
    if (!id) return false;
    const widget = this._widgets[id];
    if (!widget) return false;
    if (!widget.data) {
      widget.data = {};
    }
    widget.data[widgetName] = data;
    return true;
  }
  /**
   * 渲染侧边栏并返回HTML代码
   * @param {NodeAir} app NodeAir实例
   * @param {String} id 侧栏卡片名称
   * @param {Object} common 数据
   * @return {String} 返回html代码
   */
  getWidgets(app, id, common = {}) {
    if (!app || !id) return '';
    const { theme } = app;
    const { ejs } = theme;
    const widgetConf = this._widgets[id];
    const { ejsDir, data } = widgetConf;
    let html = '';
    widgetConf.widgets.forEach(name => {
      const tplPath = path.join(ejsDir, name) + '.ejs';
      const tplContent = fs.readFileSync(tplPath, 'utf8');
      const _data = Object.assign(common, {
        widget: data[name],
      });
      html += ejs.renderStr(tplContent, _data);
    });
    return html;
  }
}

module.exports = Widget;
