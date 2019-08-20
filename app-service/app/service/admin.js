'use strict';

const Service = require('egg').Service;
/**
 * @class AdminService
 * @extends extend Service
 * description 管理员Server
 */
class AdminService extends Service {
  async login(userName, password) {
    let userInfo = await this.getUserInfo(userName, password);
    if (userInfo) {
      await this.app.model.Admin.update(
        { ip: this.ctx.ip, lastModifierTime: new Date() },
        {
          where: { userName }
        }
      );
      return userInfo;
    }
  }
  async getUserInfo(userName, password) {
    let where = { userName };
    if (password) {
      where.password = password;
    }
    return await this.app.model.Admin.getOne({
      where,
      attributes: {
        exclude: [ 'password', 'ip' ]
      }
    });
  }
  async register(userName, password) {
    return await this.app.model.Admin.createOne({
      userName,
      password,
      name: userName
    });
  }
  async getAdminList() {
    return await this.app.model.Admin.getAdminList();
    // return await this.app.model.Admin.grid({
    //   pagination: { page: 1, pageSize: 1 },
    //   type: 'findAll'
    // });
  }
  async deleteAdmin() {
    return await this.app.model.Admin.deleteOne({});
  }
}

module.exports = AdminService;
