'use strict';

const BaseController = require('./base_controller');
class HomeController extends BaseController {
  async index() {
    const uuid = this.ctx.cookies.get('uuid', { signed: false });
    const name = this.ctx.cookies.get('name', { signed: false });
    const userName = this.ctx.cookies.get('userName', { signed: false });
    const userType = this.ctx.cookies.get('userType', { signed: false });
    console.log(uuid, name, userName, userType);
    // const data = await this.ctx.service.admin.getAdminList();
    this.success({
      data: { uuid, name, userName, userType }
    });
  }
}
module.exports = HomeController;
