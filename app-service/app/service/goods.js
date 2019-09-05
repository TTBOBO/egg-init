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
    sort_by,
    goodsId
  }) {
    const { app } = this;
    // const {
    //   Sequelize: { Op }
    // } = app;
    let where = {
      name,
      status,
      salePrice,
      categoryId,
      goodsId
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

  async addGoods(body = {}) {
    return await this.app.model.Goods.createOne({ ...body });
  }
  async updateGoods(body = {}) {
    let { goodsId, ...updateData } = body;
    return await this.app.model.Goods.update(
      { ...updateData },
      { where: { goodsId } }
    );
  }

  async changeGoodsStatus(body = {}) {
    const { ids, status } = body;
    const { app } = this;
    const {
      Sequelize: { Op }
    } = app;
    return await this.app.model.Goods.update(
      {
        status
      },
      {
        where: {
          goodsid: {
            [Op.or]: ids
          }
        }
      }
    );
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
    let { id } = body;
    return await this.app.model.Category.deleteOne({
      where: {
        id
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
