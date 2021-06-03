/**
 * 用户配置生成
 */
 function userConfigGenerator(params = {}) {
  const { site, database } = params;
  const { base } = site;
  
  const userConfig = {
    debug: false,
    createTime: new Date().getTime(),
    isInstalled: true,
    cache: {
      enable: true,
      interval: 60000
    },
    site: {
      title: site.title,
      description: site.description,
      keywords: site.keywords,
      base: ['/', '\\'].includes(base.charAt(base.length - 1)) ? base.substr(0, base.length - 1) : base
    },
    database: {
      type: '',
      options: {}
    }
  }
  switch (database.type) {
    case 'sqlite':
      userConfig.database.type = database.type;
      userConfig.database.options.dialect = database.type;
      userConfig.database.options.storage = database.optionStorage;
      break;
    case 'postgresql':
    case 'mariadb':
    case 'mssql':
    case 'mysql':
      const type = database.type;
      userConfig.database.type = type;
      userConfig.database.dialect = type === 'postgresql' ? 'postgres' : type;
      userConfig.database.options.host = database.optionHost;
      userConfig.database.options.port = database.optionPort;
      userConfig.database.options.database = database.optionDatabase;
      userConfig.database.options.username = database.optionUsername;
      userConfig.database.options.password = database.optionPassword;
      break;
  }
  return userConfig;
}

module.exports = userConfigGenerator;
