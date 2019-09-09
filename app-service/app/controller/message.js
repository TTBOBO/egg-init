'use strict';
const BaseController = require('./base_controller');
class Message extends BaseController {
  async getMessageList() {
    let result = await this.ctx.service.message.getMessageList(this.ctx.query);
    this.success({
      result
    });
  }
}
module.exports = Message;
