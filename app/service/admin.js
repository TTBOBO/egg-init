'use strict';

const Service = require('egg').Service;
/**
 * @class AdminService
 * @extends extend Service
 * description 管理员Server
 */
class AdminService extends Service {
  async login(userName) {
    const userinfo = this.app.model.Admin.getOne({
      where: {
        userName
      }
    });
    return userinfo;
  }
  async getAdminList() {
    return await this.app.model.Admin.getAdminList();
    // return await this.app.model.Admin.grid({
    //   pagination: { page: 1, pageSize: 1 },
    //   type: 'findAll'
    // });
  }
}

module.exports = AdminService;
