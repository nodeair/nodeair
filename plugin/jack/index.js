async function loaded() {
  const { hook } = this;
  await hook.on('core.app.controller.home.01', async function (state) {
    state.data.title += 'Jack.';
  });
}

module.exports = loaded;
