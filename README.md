# NodeAir

NodeAir 是一款基于KoaJs的开源的CMS/BLOG程序，拥有完整的插件和主题机制，可用于定制任何可能的WEB应用程序。

官方网站：https://www.nodeair.com/

# 一、使用者文档

## 下载安装

**不推荐**使用 NPM 或者其他包管理器安装本软件，这样的方式并不方便修改源代码或者安装和管理插件/主题。

**推荐**直接克隆本仓库到本地：``git clone https://github.com/lisniuse/nodeair``;

## 配置文件

在 NodeAir 程序根目录下面有一个叫 ``nodeair.config.json`` 的文件，这个文件里包含了整个程序的配置信息。系统默认配置如下：

```JSON
{
  "theme": "default",
  "host": "127.0.0.1",
  "protocol": "http",
  "port": 6688,
  "lang": "zh-cn",
  "isMinimize": true,
  "isInstalled": true,
  "debug": true,
  "systemPluginOrder": [
    "install",
    "template",
    "run",
    "app",
    "vector"
  ],
  "site": {
    "title": "又一个 NodeAir 站点",
    "description": "又一个 NodeAir 站点",
    "keywords": "nodeair站点"
  },
  "database": {
    "type": "sqlite",
    "options": {
      "storage": "data/database.sqlite"
    }
  }
}
```

程序会自动的将根目录下的 ``nodeair.config.json`` 里的配置项与系统默认的配置文件里的配置项进行合并，并且会优先使用用户所定义的配置项。

如果用户没有提供配置文件，或者该文件里的配置项为空，则全部采用系统默认的配置项，如上所示。

### 各项配置简介

配置项 | 简介
---|---
``theme`` | 当前设置的主题的名称
``host`` | 程序启动时监听的IP
``protocol`` | 程序所使用的http协议
``port`` | 程序启动监听的端口号
``lang`` | 程序所支持的语言，选择 ``zh-cn``、``zh-tw``，``en-us`` 其一
``isMinimize`` | 输出的html是否最小化
``isInstalled`` | 程序是否安装过（初始化过数据库）
``debug`` | 是否启用调试模式（开发模式）
``systemPluginOrder`` | 系统插件的加载顺序（不建议修改）
``site.title`` | 站点配置 - 站点名称
``site.description`` | 站点配置 - 站点描述
``site.keywords`` | 站点配置 - 站点关键词
``database`` | 数据库配置（详细配置见下表）
``database.type`` | 表示数据库类型，选择 ``sqlite``、``mysql``、``mariadb``、``postgres``、``mssql`` 其一

### 各类型的数据库配置

#### SQLite

配置项 | 简介
---|---
``database.options.storage`` | 数据库存储的位置，是一个相对程序的路径。

#### 其他类型的数据库

配置项 | 简介
---|---
``database.options.database`` | 数据库名称
``database.options.username`` | 数据库账号
``database.options.password`` | 数据库密码
``database.options.host`` | 数据库的host（有端口需要带上端口）

## 安装依赖

在你的终端输入以下命令：

```bash
$ npm install
```

# 二、开发者文档

## 运行开发模式

在你的终端输入以下命令：

```bash
$ npm run dev
```

## 插件或主题的生命周期

需要注意的几点：

1. 每一个主题或者插件的入口文件里，都可以导出以下这三个函数，但不是必须的。
2. 如果默认只导出一个函数的时候，则这个函数代表的是``loaded``这个生命周期。

生命周期如下：

1. ``installed`` - 插件或主题安装完成时执行，只会在插件安装完成后执行一次。
1. ``loaded`` - 插件或主题加载完成时执行，每次启动程序都会执行一次。
1. ``uninstalled`` - 插件或主题卸载完成时执行，只会在插件安装完成后执行一次。

## 插件或主题的编写约定

1. 插件是一个目录。
1. 目录里面必须包含一个入口文件，一般是 ``index.js``。
1. 目录里面必须包含一个 ``package.json`` 文件用于告诉NodeAir该插件的各项信息。
1. 上指的 ``package.json`` 文件是标准的 npm 包的 ``package.json`` 文件，不过NodeAir支持更多的配置项。

## 主题目录里必须要有的文件

1. ``package.json`` - 是标准的 npm 包的 ``package.json`` 文件。
1. ``template`` - 用于存放 ejs 模板文件的目录。
1. ``static`` - 用于存放主题所需静态资源的目录。
1. ``index.js`` - 一般入口文件，导出一个函数，函数体返回插件或主题所需的生命周期函数。

## 开源许可协议

本软件（NodeAir）遵循 [GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) 协议，国内用户请阅读[LICENSE-zh.md](/LICENSE-zh.md)。
