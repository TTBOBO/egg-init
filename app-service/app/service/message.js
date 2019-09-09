'use strict';

const Service = require('egg').Service;
class Message extends Service {
  async getMessageList({
    page = 1,
    size = 10,
    status,
    sort_type,
    sort_by
    // createdTime
  }) {
    const { app } = this;
    // const {
    //   Sequelize: { Op }
    // } = app;
    // let where = {
    //   status
    // };
    console.log(page, size);
    // if (createdTime) {
    //   where.createdTime = {
    //     [Op.between]: createdTime.split(',').map(item => new Date(item))
    //   };
    // }
    return await app.model.Message.grid({
      pagination: { page, size },
      // where,
      sort: [ sort_by, sort_type ],
      include: [
        {
          model: this.app.model.Order
        },
        {
          model: this.app.model.Goods
        }
      ]
    });
  }
}

module.exports = Message;
