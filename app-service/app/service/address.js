'use strict';
const Service = require('egg').Service;
class Address extends Service {
  async getAddressList(uuid) {
    return await this.app.model.Address.grid({
      // type: 'findAll',
      where: {
        uuid
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
  async setDefaltStatus(body) {
    let { id, uuid } = body;
    const transaction = await this.app.getTransaction();
    const sequelize = this.app.Sequelize;
    const { Op } = sequelize;
    let updateOne = await this.app.model.Address.update(
      { isDefault: 'is' },
      { where: { id }, transaction }
    );
    if (!updateOne.length) {
      return updateOne;
    }
    await this.app.model.Address.update(
      { isDefault: 'no' },
      {
        where: {
          uuid,
          id: {
            [Op.ne]: id
          }
        },
        transaction
      }
    );
    return updateOne;
  }
  async addAddress(body = {}) {
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
