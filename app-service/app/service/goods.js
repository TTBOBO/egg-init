'use strict';
const Service = require('egg').Service;
class Goods extends Service {
  async goodsList({
    page,
    size,
    name,
    status,
    salePrice,
    categoryId,
    sort_type,
    sort_by
  }) {
    const { app } = this;
    // const {
    //   Sequelize: { Op }
    // } = app;
    let where = {
      name,
      status,
      salePrice,
      categoryId
    };
    return await app.model.Goods.grid({
      pagination: { page, size },
      where,
      sort: [ sort_by, sort_type ],
      include: [
        {
          model: this.app.model.Category
        }
      ]
    });
  }

  async categoryList({ categoryName }) {
    const { app } = this;
    const {
      Sequelize: { Op }
    } = app;
    let where = {};
    if (categoryName) {
      where = {
        categoryName: {
          [Op.like]: `%${categoryName}%`
        }
      };
    }
    return await this.app.model.Category.grid({
      where,
      pagination: { page: 1, size: 1000 }
    });
  }

  async addCategory(body = {}) {
    return await this.app.model.Category.createOne({ ...body });
  }
  async deleteCategory(body = {}) {
    let { ids } = body;
    const sequelize = this.app.Sequelize;
    const { Op } = sequelize;
    return await this.app.model.Category.deleteOne({
      where: {
        id: {
          [Op.or]: ids
        }
      }
    });
  }
  async updateCateGory(body = {}) {
    let { id, ...updateData } = body;
    return await this.app.model.Category.update(
      { ...updateData },
      { where: { id } }
    );
  }
}

module.exports = Goods;
