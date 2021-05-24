module.exports = async function() {
    const { hook } = this;
    await hook.on('core.template.01', async function(ctx) {
        ctx.set('Content-Type', 'text/html; charset=utf-8');
    });
}
