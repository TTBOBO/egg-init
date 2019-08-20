'use strict';
const BaseController = require('./base_controller');
class Os extends BaseController {
  async getNetworkIo() {
    let data = await this.ctx.service.os.getNetworkIo();
    this.success({
      data
    });
  }
}
module.exports = Os;
