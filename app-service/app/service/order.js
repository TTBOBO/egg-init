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
}

module.exports = Order;
