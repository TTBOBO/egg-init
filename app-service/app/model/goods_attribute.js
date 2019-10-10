'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;

  const {
    schema
  } = require('../schema/goods_attribute')(app);

  let GoodsAttribute = model.define('goodsAttribute', schema, {
    tableName: 'goods_attribute',
    freezeTableName: true
  });
  GoodsAttribute = concatModel(GoodsAttribute);
  GoodsAttribute.associate = () => {
    GoodsAttribute.belongsTo(model.models.goodsAttributeCategory, {
      foreignKey: 'goods_attribute_category_id',
      targetKey: 'goods_attribute_category_id'
    });
  };
  return GoodsAttribute;
};
