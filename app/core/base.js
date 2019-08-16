'use strict';
class BaseModel {
  constructor(model) {
    this.model = model;
    this.baseFun = [ 'getOne', 'grid', 'createOne' ];
  }
  async getOne(where) {
    return await this.findOne(where);
  }

  async grid({
    where = {},
    sort = [],
    attributes = {},
    pagination = {},
    transaction = null,
    type = 'findAndCountAll' // findAll
  }) {
    const { page = 1, pageSize: limit = 10 } = pagination;
    let option = {
      limit,
      offset: (page - 1) * limit,
      order: sort.length ? [ sort ] : [[ 'createdTime', 'DESC' ]],
      where,
      attributes
    };
    if (transaction) {
      option.transaction = transaction;
    }
    return await this[type](option);
  }
  async createOne(data, option = {}) {
    return await this.create(data, { ...option });
  }
}

module.exports = BaseModel;
