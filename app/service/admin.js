'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
  async getAdminList() {
    return await this.app.model.Admin.getAdminList();
  }
}

module.exports = AdminService;
