module.exports = async function() {
    const { hook } = this;
    await hook.on('core.app.controller.home.01', async function(state) {
        state.data.text += 'Jack.';
    });
}
