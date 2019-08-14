'use strict';

const Controller = require('egg').Controller;
const BaseController = require('./base_controller');
class HomeController extends BaseController {
  async index() {
    const {
      ctx
    } = this;
    let data = await this.ctx.service.admin.getAdminList();
    this.success({
      data
    })
  }
}
module.exports = HomeController;
