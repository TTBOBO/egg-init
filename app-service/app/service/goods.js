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
    return await app.model.Goods.update(
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
    // if (hasChild) {
    //   include.push({
    //     model: this.app.model.Category,
    //     as: 'parent'
    //   });
    // }

    return await this.app.model.Category.grid({
      where,
      include,
      pagination: { page: 1, size: 1000 }
    });
  }

  async getCategoryTree({ level = 0 }) {
    const { app } = this;
    let rootNeeds = await app.model.Category.grid({
      where: {
        level
      },
      type: 'findAll'
    });
    rootNeeds = await this.getChildNeeds(rootNeeds);
    return rootNeeds;
  }
  async getChildNeeds(rootNeeds) {
    rootNeeds = JSON.parse(JSON.stringify(rootNeeds));
    const { app } = this;
    let expendPromise = [];
    rootNeeds.forEach(item => {
      expendPromise.push(
        app.model.Category.grid({
          where: {
            parentId: item.id
          },
          type: 'findAll'
        })
      );
    });
    let child = await Promise.all(expendPromise);
    for (let [ idx, item ] of child.entries()) {
      if (item.length > 0) {
        item = await this.getChildNeeds(item);
      }
      rootNeeds[idx].child = item;
    }
    return rootNeeds;
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

  async addGoodsAttributeCategory(body = {}) {
    return await this.app.model.GoodsAttributeCategory.createOne({ ...body });
  }

  async updateGoodsAttributeCategory(body = {}) {
    let { goods_attribute_category_id, name } = body;
    return await this.app.model.GoodsAttributeCategory.update(
      { name },
      { where: { goods_attribute_category_id } }
    );
  }

  async deleteGoodsAttributeCategory(body = {}) {
    let { goods_attribute_category_id } = body;
    return await this.app.model.GoodsAttributeCategory.deleteOne({
      where: {
        goods_attribute_category_id
      }
    });
  }

  async inOrdeCrement({
    goods_attribute_category_id,
    status,
    type,
    transaction
  }) {
    const GoodsAttributeCategory = this.app.model.GoodsAttributeCategory;
    return await GoodsAttributeCategory[status ? 'increment' : 'decrement'](
      Number(type) === 0 ? 'attributeCount' : 'paramCount',
      {
        transaction,
        where: { goods_attribute_category_id }
      }
    );
  }

  async addUpdateGoodsAttribute({ goods_attribute_id, ...aData }) {
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
        type: aData.type,
        transaction
      });
    }
    return data;
  }

  async GoodsAttributeInfo({ goods_attribute_id }) {
    return await this.app.model.GoodsAttribute.findByPk(goods_attribute_id);
  }

  async GoodsAttributeList({ page, size, goods_attribute_category_id, type }) {
    return await this.app.model.GoodsAttribute.grid({
      include: [
        {
          model: this.app.model.GoodsAttributeCategory
        }
      ],
      where: { goods_attribute_category_id, type },
      pagination: { page, size }
    });
  }

  async deleteGoodsAttribute({
    goods_attribute_id,
    type,
    goods_attribute_category_id
  }) {
    const transaction = await this.app.getTransaction();
    let data = await this.app.model.GoodsAttribute.deleteOne({
      where: {
        goods_attribute_id
      },
      transaction
    });
    if (data) {
      await this.inOrdeCrement({
        goods_attribute_category_id,
        status: false,
        type,
        transaction
      });
    }
    return data;
  }
}

module.exports = Goods;
