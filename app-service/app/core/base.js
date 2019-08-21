'use strict';
class BaseModel {
  constructor(model) {
    this.model = model;
    this.baseFun = [ 'getOne', 'grid', 'createOne', 'deleteOne' ];
  }
  async getOne(where) {
    return await this.findOne(where);
  }

  async grid({
    where = {},
    sort = [],
    attributes = {},
    pagination = {},
    include,
    transaction = null,
    type = 'findAndCountAll' // findAll
  }) {
    const { page = 1, pageSize: limit = 10 } = pagination;
    let option = {
      offset: (page - 1) * limit,
      order: sort.length ? [ sort ] : [[ 'createdTime', 'DESC' ]],
      where,
      attributes,
      include
    };
    if (transaction) {
      option.transaction = transaction;
    }
    if (include) {
      option.include = include;
    }
    if (type !== 'findAll') {
      option.limit = limit;
    }
    return await this[type](option);
  }
  async createOne(data, option = {}) {
    return await this.create(data, { ...option });
  }
  async deleteOne({ where = {}, limit, transaction }) {
    let option = {
      where
    };
    if (transaction) {
      option.transaction = transaction;
    }
    return await this.destroy(option);
  }
}

module.exports = BaseModel;
