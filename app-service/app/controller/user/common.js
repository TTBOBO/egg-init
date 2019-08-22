'use strict';
const baseController = require('../base_controller');
class Common extends baseController {
  async login() {
    const { ctx } = this;
    ctx.validate({
      userName: { type: 'string' },
      password: { type: 'string' },
      code: { type: 'string' }
    });
    let { userName, password, code } = ctx.request.body;
    if (this.verifyCode(code)) {
      this.fail('图形验证码错误');
      return;
    }
    let userInfo = await ctx.service.admin.login(userName, password);
    if (userInfo) {
      ctx.setToken(userInfo);
      this.success({
        data: { userInfo, token: this.ctx.getToken() }
      });
    } else {
      this.fail('用户或密码不正确');
    }
  }

  async register() {
    const { ctx } = this;
    ctx.validate({
      userName: { type: 'string' },
      password: { type: 'string' }
    });
    let { userName, password } = ctx.request.body;
    let regStaus = await ctx.service.admin.getUserInfo(userName);
    if (!regStaus) {
      this.success({
        data: await ctx.service.admin.register(userName, password)
      });
    } else {
      this.fail('用户已注册');
    }
  }

  async loginOut() {
    this.ctx.removecookies();
    this.success({ data: '退出成功' });
  }
  async getCodeImg() {
    await this.getCode();
  }
  async getUserList() {
    // let data = await this.ctx.service.user.createTasks();
    let createData = await this.ctx.service.user.getUserList();
    this.success({
      data: {
        // select: data
        createData
      }
    });
  }
}
module.exports = Common;
