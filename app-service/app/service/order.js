'use strict';
const Service = require('egg').Service;
class Order extends Service {
  async weekCount(count = 7) {
    const { model } = this.app;
    let quertSql =
      'SELECT a.click_date,IFNULL(b.count,0) AS count FROM (SELECT CURDATE() AS click_date  UNION ALL ';
    for (var i = 1; i < count; i++) {
      quertSql +=
        ' SELECT DATE_SUB(CURDATE(), INTERVAL ' +
        i +
        ' DAY) AS click_date' +
        (i < count - 1 ? ' UNION ALL ' : '');
    }
    quertSql +=
      ') a LEFT JOIN (SELECT DATE(createdTime) AS DATETIME, COUNT(*) AS COUNT FROM `order` GROUP BY DATE(createdTime)) b ON a.click_date = b.datetime';
    let data = await model.query(quertSql, { type: 'SELECT' });
    return data.reduce(
      (cur, item) => {
        cur.times.unshift(item.click_date);
        cur.values.unshift(item.count);
        return cur;
      },
      {
        times: [],
        values: []
      }
    );
  }
  async orderList({
    page,
    size,
    uuid,
    billNumber,
    status,
    shopName,
    sort_type,
    sort_by,
    createdTime
  }) {
    const { app } = this;
    const {
      Sequelize: { Op }
    } = app;
    let where = {
      uuid,
      billNumber,
      status,
      shopName
    };
    if (createdTime) {
      where.createdTime = {
        [Op.between]: createdTime.split(',').map(item => new Date(item))
      };
    }
    return await app.model.Order.grid({
      pagination: { page, size },
      where,
      sort: [ sort_by, sort_type ],
      include: [
        {
          model: this.app.model.Customer
        }
      ]
    });
  }

  async diverGoods(body = {}) {
    let { orderId } = body;
    return await this.app.model.Order.update(
      { status: 'dispatching' },
      { where: { orderId } }
    );
  }

  async CommerList({ page, size, uuid, sort_type, sort_by }) {
    const { app } = this;
    let where = {
      uuid
    };
    return await app.model.Comment.grid({
      pagination: { page, size },
      where,
      sort: [ sort_by, sort_type ],
      include: [
        {
          model: this.app.model.Customer
        },
        {
          model: this.app.model.Order
        }
      ]
    });
  }

  async addRemark(body = {}) {
    let { commentId, ...updateData } = body;
    return await this.app.model.Comment.update(
      { ...updateData },
      { where: { commentId } }
    );
  }

  async addComment(body = {}) {
    return await this.app.model.Comment.createOne({ ...body });
  }
}

module.exports = Order;
