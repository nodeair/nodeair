const path = require('path');
const fs = require('fs-extra');

/**
 * 加载插件通过 index.js
 * @param {*} pluginEntry 入口
 */
async function loadPluginEntry(pluginEntry) {
    if (typeof pluginEntry === 'function') {
        await pluginEntry.call(this);
    } else if (typeof pluginEntry === 'object') {
        if (typeof pluginEntry.loaded === 'function') {
            await pluginEntry.loaded.call(this);
        }
    }
}

/**
 * 加载插件
 * @param {*} dir 指定目录
 * @param {*} order 加载熟悉怒 
 */
async function loadPlugin(dir, order) {
    const plugins = fs.readdirSync(dir);
    order = Array.isArray(order) ? order : plugins;
    for (const plugin of order) {
        if (!plugins.includes(plugin)) return;
        const packagePath = path.join(dir, plugin, 'package.json');
        if (fs.existsSync(packagePath)) {
            const packageJson = require(packagePath);
            const pluginEntry = require(path.join(dir, plugin, packageJson.main));
            await loadPluginEntry.call(this, pluginEntry);
        } else {
            const indexPath = path.join(dir, plugin, 'index.js');
            if (fs.existsSync(indexPath)) {
                const pluginEntry = require(indexPath);
                await loadPluginEntry.call(this, pluginEntry);
            }
        }
    }
}

module.exports = loadPlugin;
