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
  async changeOrderStatus() {
    const { ctx } = this;
    ctx.validate({
      status: { type: 'string' },
      orderId: { type: 'string' }
    });
    let result = await this.service.order.changeOrderStatus(ctx.request.body);
    this.success({
      result
    });
  }
  async orderInfo() {
    let result = await this.service.order.orderInfo(this.ctx.query);
    this.success({
      result
    });
  }
  async diverGoods() {
    const { ctx } = this;
    ctx.validate({
      orderId: { type: 'string' }
    });
    let result = await this.service.order.diverGoods(ctx.request.body);
    this.success({
      result
    });
  }

  async CommerList() {
    let result = await this.service.order.CommerList(this.ctx.query);
    this.success({
      result
    });
  }
  async addRemark() {
    const { ctx } = this;
    ctx.validate({
      commentId: { type: 'string' },
      remark: { type: 'string' }
    });
    let result = await this.service.order.addRemark(ctx.request.body);
    this.success({
      result
    });
  }

  async addComment() {
    const { ctx } = this;
    ctx.validate({
      orderId: { type: 'string' },
      uuid: { type: 'number' },
      score: { type: 'number' },
      comment: { type: 'string?' }
    });
    let result = await this.service.order.addComment(ctx.request.body);
    this.success({
      result
    });
  }
}
module.exports = Order;
