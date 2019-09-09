'use strict';
const BaseController = require('./base_controller');
class Os extends BaseController {
  async getNetworkIo() {
    let result = await this.ctx.service.os.getNetworkIo();
    this.success({
      result
    });
  }
}
module.exports = Os;
