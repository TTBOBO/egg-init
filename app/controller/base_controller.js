'use strict';

const Controller = require('egg').Controller;
class BaseController extends Controller {
  success({
    data,
    status,
    message = ''
  }) {
    this.ctx.body = {
      code: this.ctx.SUCCESS_CODE,
      message,
      data
    };
    this.ctx.status = status || 200;
  }

  fail(code, message) {
    this.ctx.body = {
      code: this.ctx.ERR_CODE || code,
      message,
      data: {}
    };
    this.ctx.status = 200;
  }
}
module.exports = BaseController;
