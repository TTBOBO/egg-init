'use strict';
const BaseController = require('./base_controller');
class Message extends BaseController {
  async getMessageList() {
    let result = await this.ctx.service.message.getMessageList(this.ctx.query);
    this.success({
      result
    });
  }
  async changeMessageStatus() {
    const {
      ctx
    } = this;
    ctx.validate({
      mid: {
        type: 'string'
      },
      type: {
        type: 'string?'
      },
      goodsId: {
        type: 'string?'
      },
      tatus: {
        type: 'string?'
      }
    });
    let result = await this.ctx.service.message.changeMessageStatus(
      ctx.request.body
    );
    this.success({
      result
    });
  }
}
module.exports = Message;
