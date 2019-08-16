'use strict';
const baseController = require('../base_controller');
class Common extends baseController {
  async login() {
    const { ctx } = this;
    ctx.validate({
      userName: { type: 'string' },
      password: { type: 'string' }
    });
    let { userName, password } = ctx.request.body;
    let user = await ctx.service.admin.login(userName, password);
    if (user) {
      if (user.password === password) {
        const { password, ...data } = user;
        ctx.setToken(data.dataValues);
        this.success({
          data: { userInfo: data.dataValues, token: this.ctx.getToken() }
        });
      } else {
        this.fail('密码不正确');
      }
    } else {
      this.fail('用户不存在');
    }
  }
}
module.exports = Common;
