'use strict';
const { filterNull } = require('./util');
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
    const { page = 1, size: limit = 10 } = pagination;
    let option = {
      offset: (Number(page) - 1) * limit,
      order: sort.length && sort[1] ? [ sort ] : [[ 'createdTime', 'DESC' ]],
      where: filterNull(where),
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
      option.limit = Number(limit);
    }
    let data = await this[type](option);
    return type === 'findAll'
      ? data
      : {
        data: data.rows,
        data_total_num: data.count,
        data_total_page: Math.ceil(data.count / limit)
      };
  }
  async createOne(data, option = {}) {
    return await this.create(data, { ...option });
  }
  async deleteOne({ where = {}, limit, transaction }) {
    console.log(limit);
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
