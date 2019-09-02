'use strict';
const baseController = require('./base_controller');
class Order extends baseController {
  async weekCount() {
    let data = await this.service.order.weekCount();
    this.success({
      data
    });
  }
}
module.exports = Order;
