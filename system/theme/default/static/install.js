(function () {
  const nodeair = new NodeAir();
  const validator = nodeair.validator;
  const Rule = function () {
    const that = this;
    const Manager = function () {
      return {
        nickname: [
          { required: true, message: '请输入网站管理员的昵称', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const result = validator.isNickname(value);
              if (result === true) {
                callback();
              } else {
                callback(new Error(result));
              }
            },
            trigger: 'blur'
          }
        ],
        username: [
          { required: true, message: '请输入网站管理员的用户名', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const result = validator.isUsername(value);
              if (result === true) {
                callback();
              } else {
                callback(new Error(result));
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入网站管理员的密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const result = validator.isPassword(value);
              if (result === true) {
                callback();
              } else {
                callback(new Error(result));
              }
            },
            trigger: 'blur'
          }
        ]
      }
    };
    const Site = function () {
      return {
        title: [
          { required: true, message: '请输入站点名称', trigger: 'blur' },
          { min: 1, max: 80, message: '长度在 1 到 80 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入站点描述', trigger: 'blur' },
          { min: 1, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入站点关键词', trigger: 'blur' },
          { min: 1, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' }
        ]
      };
    }
    const Database = function () {
      return {
        optionStorage: [
          { required: true, message: '请输入SQLite 存放路径', trigger: 'blur' }
        ],
        optionHost: [
          { required: true, message: '请输入主机（HOST）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const result = validator.isIP(value);
              if (result === true) {
                callback();
              } else {
                callback(new Error(result));
              }
            },
            trigger: 'blur'
          }
        ],
        optionPort: [
          { required: true, message: '请输入主机（PORT）', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const result = validator.isPort(value);
              if (result === true) {
                callback();
              } else {
                callback(new Error(result));
              }
            },
            trigger: 'blur'
          }
        ],
        optionUsername: [
          { required: true, message: '请输入数据用户名', trigger: 'blur' }
        ],
        optionPassword: [
          { required: true, message: '请输入数据库密码', trigger: 'blur' }
        ]
      };
    }
    return {
      manager: Manager.call(that),
      site: Site.call(that),
      Database: Database.call(that)
    }
  }
  const Manager = function () {
    return {
      nickname: '',
      username: '',
      password: ''
    };
  };
  const Site = function () {
    return {
      title: '',
      description: '',
      keywords: ''
    }
  };
  const Database = function (type) {
    const database = {
      type: 'mysql',
      optionStorage: 'data/database.sqlite',
      optionHost: '127.0.0.1',
      optionPort: '',
      optionDatabase: 'nodeair',
      optionUsername: 'nodeair',
      optionPassword: 'nodeair'
    };
    database.type = type;
    switch (type) {
      case 'mariadb':
      case 'mysql':
        database.optionPort = '3306';
        break;
      case 'postgres':
        database.optionPort = '5432';
        break;
      case 'mssql':
        database.optionPort = '1433';
        break;
      default:
        database.optionPort = '';
    }
    return database;
  };
  new Vue({
    el: '#install',
    data: function () {
      const rule = Rule.call(this);
      return {
        isSubmitted: false,
        step: 1,
        manager: Manager(),
        site: Site(),
        database: Database('mysql'),
        rule
      };
    },
    watch: {
      'database.type': function(type) {
        const _database = Database(type);
        Object.keys(this.database).forEach(key => {
          if (key !== 'type') {
            this.database[key] = _database[key];
          }
        });
      }
    },
    methods: {
      /**
       * 点击安装
       */
      onSubmit: function () {
        this.$refs.database.validate((valid) => {
          if (valid) {
            this.request();
          } else {
            return false;
          }
        });
      },
      /**
       * 点击上一步
       */
      onPrev: function () {
        this.step--;
      },
      /**
       * 点击下一步
       */
      onNext: function () {
        const formName = {
          1: 'manager',
          2: 'site',
          3: 'database'
        }[this.step];
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.step++;
          } else {
            return false;
          }
        });
      },
      /**
       * 请求
       */
      request() {
        this.isSubmitted = true;
        const vm = this;
        const params = {
          manager: this.manager,
          site: this.site,
          database: this.database,
        }
        axios.post('/api/install', params)
          .then(function (response) {
            if (response.data.code === 0) {
              window.location.href = '/';
            } else {
              vm.$message.error(response.data.msg);
              vm.isSubmitted = false;
            }
          });
      },
      /**
       * 生成随机密码
       */
      handleGeneratePassword() {
        this.manager.password = nodeair.util.randomString(16);
      }
    }
  })
})();
