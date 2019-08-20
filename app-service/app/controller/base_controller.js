'use strict';

const Controller = require('egg').Controller;
class BaseController extends Controller {
  async getCode() {
    const svgCaptcha = require('svg-captcha');
    var codeConfig = {
      size: 5,
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      height: 44
    };
    var captcha = svgCaptcha.create(codeConfig);
    this.ctx.cookies.set('code', captcha.text.toLowerCase()); // 存session用于验证接口获取文字码
    var codeData = {
      img: captcha.data
    };
    this.ctx.body = codeData;
  }
  verifyCode(code) {
    return code !== this.ctx.cookies.get('code');
  }
  success({ data, status, message = '' }) {
    this.ctx.body = {
      code: this.ctx.SUCCESS_CODE,
      message,
      data
    };
    this.ctx.status = status || 200;
  }

  fail(message, code) {
    this.ctx.body = {
      code: code || this.ctx.ERR_CODE,
      message,
      data: {}
    };
    this.ctx.status = 200;
  }
}
module.exports = BaseController;
