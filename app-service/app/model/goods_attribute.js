'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;

  const { schema } = require('../schema/goods_attribute')(app);

  let goodsAttribute = model.define('goodsAttribute', schema, {
    tableName: 'goods_attribute',
    freezeTableName: true
  });
  goodsAttribute = concatModel(goodsAttribute);
  goodsAttribute.associate = () => {
    goodsAttribute.belongsTo(model.models.goodsAttributeCategory, {
      foreignKey: 'goods_attribute_category_id',
      targetKey: 'goods_attribute_category_id'
    });
  };
  return goodsAttribute;
};
