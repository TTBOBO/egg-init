'use strict';
const baseController = require('../base_controller');
class Address extends baseController {
  async getAddressList() {
    this.success({
      data: await this.ctx.service.address.getAddressList(
        this.ctx.getCookie('uuid')
      )
    });
  }
  async updateAddress() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'string?' },
      linkMan: { type: 'string?' },
      isDefault: { type: 'number?' },
      address: { type: 'string?' },
      id: { type: 'number' }
    });
    this.success({
      data: await this.ctx.service.address.updateAddress(ctx.request.body)
    });
  }
  async deleteAddress() {
    const { ctx } = this;
    this.success({
      data: await this.ctx.service.address.deleteAddress(ctx.request.body)
    });
  }
  async addAddress() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'string' },
      linkMan: { type: 'string' },
      isDefault: { type: 'number' },
      address: { type: 'string' }
    });
    this.success({
      data: await this.ctx.service.address.addAddress({
        ...ctx.request.body,
        creatorId: this.ctx.getCookie('uuid')
      })
    });
  }
}
module.exports = Address;
