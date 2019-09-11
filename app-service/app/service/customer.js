'use strict';

const Service = require('egg').Service;
class Customer extends Service {
  async getUserList({ page, size, nickName, phone, sort_type, sort_by }) {
    const { app } = this;
    return await app.model.Customer.grid({
      pagination: { page, size },
      where: { nickName, phone },
      sort: [ sort_by, sort_type ]
    });
  }
  async updateUser() {
    return await this.app.model.User.update(
      { uuid: 'bf724940-bffd-11e9-8b24-31e475a8a316' },
      {
        where: {
          uuid: 'bf724940-bffd-11e9-8b24-31e475a8a315'
        }
      }
    );
  }

  async createUser() {
    const { User } = this.app.model;
    const uuidv1 = require('uuid/v1');
    const createTime = new Date();
    let data = await User.findOrCreate({
      where: { name: 6665 },
      defaults: {
        uuid: uuidv1(),
        name: '6665',
        password: '123456',
        createdTime: createTime,
        lastModifierTime: createTime,
        lastModifierName: '',
        creatorName: '',
        enableStatus: 1,
        mobilPhone: ''
      }
    });
    return data;
  }
  async wechartLogin(data, { nickName, province, gender, avatarUrl }) {
    console.log(data);
    const { ctx, app } = this;
    let token = ctx.createdToken({ data, hour: 60 });
    let userinfo = await app.model.Customer.getOne({
      where: {
        openid: data.openid
      }
    });
    if (userinfo) {
      return {
        token,
        userinfo
      };
    }
    let userData = await app.model.Customer.createOne({
      nickName,
      province,
      gender,
      avatarUrl,
      openid: data.openid
    });
    return {
      userinfo: userData,
      token
    };
  }
}
module.exports = Customer;
