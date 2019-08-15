'use strict';

const BaseController = require('./base_controller');
class HomeController extends BaseController {
  async index() {
    const data = await this.ctx.service.admin.getAdminList();
    this.success({
      data
    });
  }
}
module.exports = HomeController;
