async function loaded() {
  const { hook } = this;
  await hook.on('system/plugin/app/controller/home', 1, async function (state) {
    state.data.title += 'Jack.';
  });
}

async function beforeMount() {
  // console.log('每次渲染之前做点什么');
}

module.exports = {
  loaded,
  beforeMount,
};
