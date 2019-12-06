'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_attribute_category')(app);
  let GoodsAttributeCategory = model.define('goodsAttributeCategory', schema, {
    tableName: 'goods_attribute_category',
    freezeTableName: true
  });
  GoodsAttributeCategory = concatModel(GoodsAttributeCategory);
  return GoodsAttributeCategory;
};
