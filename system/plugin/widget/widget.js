const path = require('path');
const fs = require('fs-extra');

class Widget {
  constructor() {
    this._widgets = {};
  }
  /**
   * 注册侧边栏
   */
  register(widgets = {}) {
    if (typeof widgets === 'object' && !Array.isArray(widgets)) {
      this._widgets = Object.assign(this._widgets, widgets);
    }
  }
  /**
   * 给侧边栏添加数据
   * @param {*} id 页面ID
   * @param {*} widgetName 侧栏卡片名称
   * @param {*} data 数据
   */
  addData(id, widgetName, data) {
    const widget = this._widgets[id];
    if (!widget) return;
    if (!widget.data) {
      widget.data = {};
    }
    widget.data[widgetName] = data;
  }
  /**
   * 渲染侧边栏并返回HTML代码
   */
  getWidgets(app, id) {
    const { theme } = app;
    const { ejs } = theme;
    const widgetConf = this._widgets[id];
    const { ejsDir, data } = widgetConf;
    let html = '';
    widgetConf.widgets.forEach(name => {
      const tplPath = path.join(ejsDir, name) + '.ejs';
      const tplContent = fs.readFileSync(tplPath, 'utf8');
      html += ejs.renderStr(tplContent, data[name]);
    });
    return html;
  }
}

module.exports = Widget;
