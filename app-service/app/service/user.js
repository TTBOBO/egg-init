'use strict';

const Service = require('egg').Service;
class User extends Service {
  async getUserList() {
    const { app } = this;
    const { Op } = app.Sequelize;
    return await app.model.User.grid({
      type: 'findAll',
      include: [
        {
          model: this.app.model.Task
          // where: {
          //   taskname: '测试name'
          // }
        },
        {
          model: this.app.model.UserInfo,
          where: {
            age: {
              [Op.gte]: 18
            }
          },
          attributes: {
            exclude: [ 'createdTime' ]
          }
        }
      ]
    });
  }
}
module.exports = User;
