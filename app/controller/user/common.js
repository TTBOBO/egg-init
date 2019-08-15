'use strict';
const baseController = require('../base_controller');
class Common extends baseController {
  async login() {
    const { ctx } = this;
    const { userName, password } = ctx.request.body;
    const user = await ctx.service.admin.login(userName, password);
    if (user) {
      if (user.password === password) {
        const { password, ...userInfo } = user;
        console.log(JSON.stringify(userInfo));
        this.success({ data: userInfo });
      } else {
        this.fail(201, '密码不正确');
      }
    } else {
      this.fail(201, '用户不存在');
    }
  }
}
module.exports = Common;
