'use strict';

const Service = require('egg').Service;
class Message extends Service {
  async getMessageList({
    page = 1,
    size = 10,
    status = 1,
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
      where: { status },
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

  async changeMessageStatus(body = {}) {
    var res;
    const { mid, goodsId, goodsStatus } = body;
    const transaction = await this.app.getTransaction();
    let data = await this.app.model.Message.update(
      { status: '2' },
      { where: { mid }, transaction }
    );
    if (goodsId) {
      res = await this.app.model.Goods.update(
        {
          status: goodsStatus === 'down' ? 'up' : 'down'
        },
        { where: { goodsId }, transaction }
      );
    }

    return data[0] && res[0];
  }
}

module.exports = Message;
