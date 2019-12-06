'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods.js')(app);
  let Goods = model.define('goods', schema);
  Goods = concatModel(Goods);
  Goods.associate = () => {
    Goods.belongsTo(model.Category);
    Goods.belongsTo(model.models.goodsAttributeCategory, {
      foreignKey: 'goods_attribute_category_id',
      targetKey: 'goods_attribute_category_id'
    });

    Goods.hasMany(model.models.goodsSku, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId',
      as: 'skuStockList'
    });
    Goods.hasMany(model.models.goodsMemberPrice, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId',
      as: 'memberPrice'
    });
    Goods.hasMany(model.models.goodsLadder, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId',
      as: 'goodsLadderList'
    });
    Goods.hasMany(model.models.goodsFullReduction, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId',
      as: 'goodsFullReductionList'
    });
    Goods.hasMany(model.models.goodsAttributeValue, {
      as: 'goodsAttributeValueList',
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
    Goods.hasMany(app.model.models.goodsVertifyRecord, {
      as: 'goodsVertifyRecord',
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return Goods;
};
