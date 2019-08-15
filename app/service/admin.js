'use strict';

const Service = require('egg').Service;
class AdminService extends Service {
  async login(userName) {
    console.log(userName);
    const userinfo = this.app.model.Admin.findOne({
      where: {
        userName
      }
    });
    return userinfo;
  }
  async getAdminList() {
    return await this.app.model.Admin.getAdminList();
  }
}

module.exports = AdminService;
