'use strict';
const baseController = require('./base_controller');
class Order extends baseController {
  async weekCount() {
    let result = await this.service.order.weekCount();
    this.success({
      result
    });
  }
  async orderList() {
    let result = await this.service.order.orderList(this.ctx.query);
    this.success({
      result
    });
  }
}
module.exports = Order;
