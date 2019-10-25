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
    goodsId,
    promotionType
  }) {
    const {
      app
    } = this;
    let where = {
      name,
      status,
      salePrice,
      categoryId,
      goodsId
    };
    const {
      Sequelize: {
        Op
      }
    } = app;
    if (promotionType) {
      where.promotionType = {
        [Op.ne]: 5
      };
    }
    return await app.model.Goods.grid({
      pagination: {
        page,
        size
      },
      where,
      sort: [ sort_by, sort_type ],
      include: [{
        model: this.app.model.Category
      }]
    });
  }

  async deleteGoods({
    goodsId
  }) {
    const transaction = await this.app.getTransaction();
    let option = {
      where: {
        goodsId
      },
      transaction
    };

    let arrData = [];
    let arr = [ 'Goods', 'GoodsAttributeValue', 'GoodsSkuStock', 'GoodsLadder', 'GoodsFullReduction', 'GoodsMemberPrice' ];
    for (var item of arr) {
      arrData.push(await this.app.model[item].deleteOne(option));
    }
    return arrData;
  }

  async addGoods(body = {}) {
    const transaction = await this.app.getTransaction();
    const {
      goodsAttributeValueList,
      goodsFullReductionList,
      goodsLadderList,
      memberPrice,
      skuStockList,
      ...goodsData
    } = body;
    let createGoods = await this.app.model.Goods.createOne({
      ...goodsData
    }, {
      transaction
    });
    const {
      goodsId
    } = createGoods;
    let addGoodsAttributeValueData = await this.addGoodsAttributeValue(goodsId, goodsAttributeValueList, transaction);
    let addSkuData = await this.addSku(goodsId, skuStockList, transaction);
    var addPromotionData = null;
    switch (body.promotionType) {
      case 2:
        addPromotionData = await this.addMemberPrice(goodsId, memberPrice, transaction);
        break;
      case 3:
        addPromotionData = await this.addGoodsLadderList(goodsId, goodsLadderList, transaction);
        break;
      case 4:
        addPromotionData = await this.addGoodsFullReductionList(goodsId, goodsFullReductionList, transaction);
        break;
      default:
        break;
    }
    return {
      createGoods,
      addGoodsAttributeValueData,
      addSkuData,
      addPromotionData
    };
  }

  async addUpdateGoods(body = {}) {
    const transaction = await this.app.getTransaction();
    const {
      goodsAttributeValueList,
      goodsFullReductionList,
      goodsLadderList,
      memberPrice,
      skuStockList,
      goodsId,
      ...goodsData
    } = body;
    let id = null;
    let editStatus = false;
    let createGoods = null;
    if (!goodsId) {
      createGoods = await this.app.model.Goods.createOne({
        ...goodsData
      }, {
        transaction
      });
      id = createGoods.goodsId;
    } else {
      editStatus = true;
      createGoods = await this.app.model.Goods.update({
        ...goodsData
      }, {
        where: {
          goodsId
        },
        transaction
      });
      id = goodsId;
    }
    let addGoodsAttributeValueData = await this.addGoodsAttributeValue(id, goodsAttributeValueList, {
      transaction
    }, editStatus);
    let addSkuData = await this.addSku(id, skuStockList, {
      transaction
    }, editStatus);
    var addPromotionData = null;
    switch (body.promotionType) {
      case 2:
        addPromotionData = await this.addMemberPrice(id, memberPrice, {
          transaction
        }, editStatus);
        break;
      case 3:
        addPromotionData = await this.addGoodsLadderList(id, goodsLadderList, {
          transaction
        }, editStatus);
        break;
      case 4:
        addPromotionData = await this.addGoodsFullReductionList(id, goodsFullReductionList, {
          transaction
        }, editStatus);
        break;
      default:
        break;
    }
    return {
      createGoods,
      addGoodsAttributeValueData,
      addSkuData,
      addPromotionData
    };
  }

  async addGoodsAttributeValue(goodsId, list, option, editStatus) {
    let addAttributeValues = this.getListData(list, goodsId);
    if (editStatus) {
      option.updateOnDuplicate = [ 'value' ];
    }
    let data = await this.app.model.GoodsAttributeValue.bulkCreate(addAttributeValues, option);
    return data;
  }
  async addSku(goodsId, list, option, editStatus) {
    if (editStatus) {
      option.updateOnDuplicate = [ 'skuCode', 'price', 'stock', 'lowStock' ];
    }
    let skuList = this.getListData(list, goodsId);

    let data = await this.app.model.GoodsSkuStock.bulkCreate(skuList, option);
    return data;
  }
  async addGoodsLadderList(goodsId, list, option, editStatus) {

    let ladderList = this.getListData(list, goodsId);
    if (editStatus) {
      option.updateOnDuplicate = [ 'count', 'price' ];
    }
    let data = await this.app.model.GoodsLadder.bulkCreate(ladderList, option);
    return data;
  }
  async addGoodsFullReductionList(goodsId, list, option, editStatus) {
    let fullReductionList = this.getListData(list, goodsId);
    if (editStatus) {
      option.updateOnDuplicate = [ 'fullPrice', 'reducePrice' ];
    }
    let data = await this.app.model.GoodsFullReduction.bulkCreate(fullReductionList, option);
    return data;
  }
  async addMemberPrice(goodsId, memberPrice, option, editStatus) {
    let goodsMemberPriceList = [];
    for (var item in memberPrice) {
      goodsMemberPriceList.push({
        memberLevelId: item,
        memberPrice: memberPrice[item],
        goodsId
      });
    }
    if (editStatus) {
      option.updateOnDuplicate = [ 'memberLevelId', 'memberPrice' ];
    }
    let data = await this.app.model.GoodsMemberPrice.bulkCreate(goodsMemberPriceList, option);
    return data;
  }

  async updateGoodsInfo({
    goodsId
  }) {
    const {
      app
    } = this;
    let goodsInfo = await app.model.Goods.findByPk(goodsId, {
      include: [{
        model: this.app.model.GoodsSkuStock,
        as: 'skuStockList'
      }, {
        model: this.app.model.GoodsLadder,
        as: 'goodsLadderList'
      }, {
        model: this.app.model.GoodsMemberPrice,
        as: 'memberPrice'
      }, {
        model: this.app.model.GoodsAttributeValue,
        as: 'goodsAttributeValueList'
      }, {
        model: this.app.model.GoodsFullReduction,
        as: 'goodsFullReductionList'
      }]
    });
    let {
      parentId
    } = await this.app.model.Category.findByPk(goodsInfo.categoryId, {
      attributes: [ 'parentId' ]
    }); // 找出父类型id
    goodsInfo.dataValues.memberPrice = goodsInfo.dataValues.memberPrice.reduce((current, item) => {
      current[item.memberLevelId] = item.memberPrice;
      return current;
    }, {});
    goodsInfo.dataValues.parentId = parentId;
    return goodsInfo;
  }

  getListData(list, goodsId) {
    return list.map(item => {
      return {
        ...item,
        goodsId
      };
    });
  }


  async changeGoodsStatus(body = {}) {
    const {
      ids,
      ...status
    } = body;
    const {
      app
    } = this;
    const {
      Sequelize: {
        Op
      }
    } = app;
    let updataData = {
      ...status
    };
    // newStatus || recommandStatus 当前只对上下架进行冻结操作
    const transaction = await this.app.getTransaction();
    if (status) {
      updataData.verifyStatus = '0';
      let arr = [];
      ids.forEach(item => arr.push({
        status: '1',
        type: 2,
        goodsId: item
      }));
      console.log(arr);
      await app.model.Message.bulkCreate(arr, {
        transaction
      });
    }

    return await app.model.Goods.update(updataData, {
      where: {
        goodsid: {
          [Op.or]: ids
        }
      },
      transaction
    });
  }

  async categoryList({
    level,
    parentId
  }, hasGoods = false) {
    let where = {
      level
    };
    let include = [];
    if (parentId) {
      where.parentId = parentId;
    }
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
      pagination: {
        page: 1,
        size: 1000
      }
    });
  }


  async getCategoryTree() {
    const {
      app
    } = this;
    let rootNeeds = await app.model.Category.grid({
      // where: {
      //   level
      // },
      type: 'findAll'
    });
    rootNeeds = await this.getChildNeeds(rootNeeds, 0);
    return rootNeeds;
  }
  async getChildNeeds(data, parentId) {
    data = JSON.parse(JSON.stringify(data));
    var itemArr = [];
    for (var i = 0; i < data.length; i++) {
      var node = data[i];
      const {
        categoryName,
        id
      } = node;
      if (node.parentId === parentId) {
        var newNode = {
          label: categoryName,
          value: id
        };
        let children = await this.getChildNeeds(data, node.id);
        if (children.length) {
          newNode.children = children;
        }
        itemArr.push(newNode);
      }
    }
    return itemArr;
  }

  async addCategory(body = {}) {
    return await this.app.model.Category.createOne({
      ...body
    });
  }
  async deleteCategory(body = {}) {
    let {
      id
    } = body;
    return await this.app.model.Category.deleteOne({
      where: {
        id
      }
    });
  }
  async updateCateGory(body = {}) {
    let {
      id,
      ...updateData
    } = body;
    return await this.app.model.Category.update({
      ...updateData
    }, {
      where: {
        id
      }
    });
  }

  async goodsAttributeCategoryList({
    page,
    size
  }) {
    return await this.app.model.GoodsAttributeCategory.grid({
      pagination: {
        page,
        size
      }
    });
  }

  async addGoodsAttributeCategory(body = {}) {
    return await this.app.model.GoodsAttributeCategory.createOne({
      ...body
    });
  }

  async updateGoodsAttributeCategory(body = {}) {
    let {
      goods_attribute_category_id,
      name
    } = body;
    return await this.app.model.GoodsAttributeCategory.update({
      name
    }, {
      where: {
        goods_attribute_category_id
      }
    });
  }

  async deleteGoodsAttributeCategory(body = {}) {
    let {
      goods_attribute_category_id
    } = body;
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
      Number(type) === 0 ? 'attributeCount' : 'paramCount', {
        transaction,
        where: {
          goods_attribute_category_id
        }
      }
    );
  }

  async addUpdateGoodsAttribute({
    goods_attribute_id,
    ...aData
  }) {
    const transaction = await this.app.getTransaction();
    let data = !goods_attribute_id ?
      await this.app.model.GoodsAttribute.createOne({
        ...aData
      }, {
        transaction
      }) :
      await this.app.model.GoodsAttribute.update({
        ...aData
      }, {
        where: {
          goods_attribute_id
        },
        transaction
      });
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

  async GoodsAttributeInfo({
    goods_attribute_id
  }) {
    return await this.app.model.GoodsAttribute.findByPk(goods_attribute_id);
  }

  async GoodsAttributeList({
    page,
    size,
    goods_attribute_category_id,
    type
  }) {
    return await this.app.model.GoodsAttribute.grid({
      include: [{
        model: this.app.model.GoodsAttributeCategory
      }],
      where: {
        goods_attribute_category_id,
        type
      },
      sort: [ 'sort', 'desc' ],
      pagination: {
        page,
        size
      }
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
  async getSkuList({
    goodsId
  }) {
    return await this.app.model.GoodsSkuStock.grid({
      type: 'findAll',
      where: {
        goodsId
      }
      // sort: [ sort_by, sort_type ],
    });
  }
  async changeSku({
    goodsId,
    data
  }) {
    const transaction = await this.app.getTransaction();
    let addSkuData = await this.addSku(goodsId, data, {
      transaction
    }, true);
    return addSkuData;
  }

  async addVertifyRecord(body = {}) {
    return await this.app.model.GoodsVertifyRecord.createOne({
      ...body
    });
  }
}

module.exports = Goods;
