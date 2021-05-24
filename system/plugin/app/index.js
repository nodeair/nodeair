const router = require('./router');

async function loaded() {
  await router(this);
}

module.exports = loaded;
