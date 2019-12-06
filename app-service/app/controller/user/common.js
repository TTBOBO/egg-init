'use strict';
const baseController = require('../base_controller');
class Common extends baseController {
  async login() {
    const {
      ctx
    } = this;
    ctx.validate({
      userName: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      code: {
        type: 'string'
      }
    });
    let {
      userName,
      password,
      code
    } = ctx.request.body;
    if (!this.verifyCode(code)) {
      this.fail('图形验证码错误');
      return;
    }
    let userInfo = await ctx.service.admin.login(userName, password);
    if (userInfo) {
      ctx.setToken(userInfo);
      this.success({
        result: {
          userInfo,
          token: this.ctx.getCookie()
        }
      });
    } else {
      this.fail('用户或密码不正确');
    }
  }

  async register() {
    const {
      ctx
    } = this;
    ctx.validate({
      userName: {
        type: 'string'
      },
      password: {
        type: 'string'
      }
    });
    let {
      userName,
      password
    } = ctx.request.body;
    let regStaus = await ctx.service.admin.getUserInfo(userName);
    if (!regStaus) {
      this.success({
        result: await ctx.service.admin.register(userName, password)
      });
    } else {
      this.fail('用户已注册');
    }
  }

  async loginOut() {
    this.ctx.removecookies();
    this.success({
      result: '退出成功'
    });
  }
  async getCodeImg() {
    await this.getCode();
  }
  async getUserList() {
    let result = await this.ctx.service.customer.getUserList(this.ctx.query);
    this.success({
      result
    });
  }

  async wechartLogin() {
    const {
      ctx,
      app,
      config
    } = this;
    ctx.validate({
      code: {
        type: 'string'
      },
      nickName: {
        type: 'string'
      },
      province: {
        type: 'string'
      },
      gender: {
        type: 'number'
      },
      avatarUrl: {
        type: 'string'
      }
    });

    const {
      appid,
      secret
    } = config.wxConfig;
    const resultData = await app.curl(
      'https://api.weixin.qq.com/sns/jscode2session', {
        method: 'GET',
        dataType: 'json',
        data: {
          appid,
          secret,
          js_code: ctx.request.body.code,
          grant_type: 'authorization_code'
        }
      }
    );
    let result = await ctx.service.customer.wechartLogin(
      resultData.data,
      ctx.request.body
    );
    this.success({
      result
    });
  }
}
module.exports = Common;
