'use strict';
const baseController = require('../base_controller');
class Address extends baseController {
  async getAddressList() {
    this.ctx.validate(
      {
        id: { type: 'string' }
      },
      this.ctx.query
    );
    this.success({
      result: await this.ctx.service.address.getAddressList(this.ctx.query.id)
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
      result: await this.ctx.service.address.updateAddress(ctx.request.body)
    });
  }
  async setDefaltStatus() {
    const { ctx } = this;
    ctx.validate({
      uuid: { type: 'number' },
      id: { type: 'number' }
    });
    this.success({
      result: await this.ctx.service.address.setDefaltStatus(ctx.request.body)
    });
  }
  async deleteAddress() {
    const { ctx } = this;
    this.success({
      result: await this.ctx.service.address.deleteAddress(ctx.request.body)
    });
  }
  async addAddress() {
    const { ctx } = this;
    ctx.validate({
      phone: { type: 'string' },
      linkMan: { type: 'string' },
      isDefault: { type: 'string' },
      address: { type: 'string' }
    });

    this.success({
      result: await this.ctx.service.address.addAddress({
        ...ctx.request.body,
        uuid: await this.ctx.getTokenKey('uuid')
      })
    });
  }
}
module.exports = Address;
