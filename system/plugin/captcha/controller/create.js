const svgCaptcha = require('svg-captcha');

/**
 * 生成验证码返回svg
 * @param {*} ctx 
 */
module.exports = async function createController(ctx) {
  // 生成验证码对象
  const captcha = svgCaptcha.create({
    size: 4,
    fontSize: 50,
    width: 120,
    height: 34,
    background: '#' + Math.random().toString(16).substr(2, 6).toUpperCase()
  });
  // 保存生成的验证码结果
  ctx.session.code = captcha.text;
  // 设置响应头
  ctx.response.type = 'image/svg+xml';
  ctx.body = captcha.data;
}
