'use strict';

const Controller = require('egg').Controller;
class BaseController extends Controller {
  success({ data, status, message = '' }) {
    this.ctx.body = {
      code: this.ctx.SUCCESS_CODE,
      message,
      data
    };
    this.ctx.status = status || 0;
  }

  fail(message, code) {
    this.ctx.body = {
      code: code || this.ctx.ERR_CODE,
      message,
      data: {}
    };
    this.ctx.status = 0;
  }
}
module.exports = BaseController;
