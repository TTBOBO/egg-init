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

  async categoryList({ level = 0 }, hasGoods = false) {
    let where = { level };
    let include = [];
    if (hasGoods) {
      include.push({
        model: this.app.model.Goods
      });
    }
    return await this.app.model.Category.grid({
      where,
      include,
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

  async goodsAttributeCategoryList({ page, size }) {
    return await this.app.model.GoodsAttributeCategory.grid({
      pagination: { page, size }
    });
  }

  async inOrdeCrement({
    goods_attribute_category_id,
    status,
    key,
    transaction
  }) {
    const GoodsAttributeCategory = this.app.model.GoodsAttributeCategory;
    return await GoodsAttributeCategory[status ? 'increment' : 'decrement'](
      key,
      {
        transaction,
        where: { goods_attribute_category_id }
      }
    );
  }

  async addUpdateGoodsAttribute({ goods_attribute_id, key, ...aData }) {
    const transaction = await this.app.getTransaction();
    let data = !goods_attribute_id
      ? await this.app.model.GoodsAttribute.createOne(
        { ...aData },
        { transaction }
      )
      : await this.app.model.GoodsAttribute.update(
        { ...aData },
        { where: { goods_attribute_id }, transaction }
      );
    if (data && !goods_attribute_id) {
      await this.inOrdeCrement({
        goods_attribute_category_id: aData.goods_attribute_category_id,
        status: true,
        key,
        transaction
      });
    }
    return data;
  }

  async GoodsAttributeInfo({ goods_attribute_id }) {
    return await this.app.model.GoodsAttribute.findByPk(goods_attribute_id);
  }

  async GoodsAttributeList({ page, size, goods_attribute_category_id }) {
    return await this.app.model.GoodsAttribute.grid({
      include: [
        {
          model: this.app.model.GoodsAttributeCategory
        }
      ],
      where: { goods_attribute_category_id },
      pagination: { page, size }
    });
  }
}

module.exports = Goods;
