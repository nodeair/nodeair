const installViewController = require('./controller/view/install');
const notInstalledController = require('./controller/view/not-installed');
const installApiController = require('./controller/api/install');

function routerConfig() {
  const app = this;
  return [
    {
      type: 'get',
      url: '/install',
      controller: installViewController.bind(app)
    },
    {
      type: 'post',
      url: '/api/install',
      controller: installApiController.bind(app)
    },
    {
      type: 'get',
      url: '/',
      controller: notInstalledController.bind(app)
    }
  ];
}

module.exports = routerConfig;
