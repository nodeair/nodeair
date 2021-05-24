module.exports = async function() {
    const { hook } = this;
    await hook.on('core.run.01', async function(state) {
        state.port = 1000;
    });
}
