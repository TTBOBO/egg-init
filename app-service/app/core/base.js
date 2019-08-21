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
    distinct = false,
    transaction = null,
    type = 'findAndCountAll' // findAll
  }) {
    const { page = 1, pageSize: limit = 10 } = pagination;
    let option = {
      offset: (page - 1) * limit,
      order: sort.length ? [ sort ] : [[ 'createdTime', 'DESC' ]],
      where,
      attributes,
      include,
      distinct // 唯一值
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
    let data = await this[type](option);
    return type === 'findAll'
      ? data
      : data || {
        data: data.rows,
        data_total_num: data.count,
        data_total_page: Math.ceil(data.count / limit)
      };
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
