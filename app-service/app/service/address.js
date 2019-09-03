'use strict';
const Service = require('egg').Service;
class Address extends Service {
  async getAddressList(creatorId) {
    return await this.app.model.Address.grid({
      // type: 'findAll',
      where: {
        creatorId
      }
    });
  }
  async updateAddress(body) {
    let { id, ...updateData } = body;
    return await this.app.model.Address.update(
      { ...updateData },
      { where: { id } }
    );
  }
  async addAddress(body = {}) {
    console.log(body);
    return await this.app.model.Address.createOne({ ...body });
  }
  async deleteAddress(body) {
    let { ids } = body;
    const sequelize = this.app.Sequelize;
    const { Op } = sequelize;
    return await this.app.model.Address.deleteOne({
      where: {
        id: {
          [Op.or]: ids
        }
      }
    });
  }
}

module.exports = Address;
