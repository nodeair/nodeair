/**
 * 用户配置生成
 */
 function userConfigGenerator(params = {}) {
  const { site, database } = params;
  const userConfig = {
    debug: false,
    isInstalled: true,
    site: {
      title: site.title,
      description: site.description,
      keywords: site.keywords
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
