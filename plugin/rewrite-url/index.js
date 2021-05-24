module.exports = async function() {
    const { hook } = this;
    await hook.on('core.app.router.01', async function(state) {
        const homeController = state.routers[0][2];
        state.routers.push(['GET', '/index.html', homeController]);
    });
}
