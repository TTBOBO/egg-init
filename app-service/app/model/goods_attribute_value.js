'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods_attribute_value')(app);

  let goodsAttributeValue = model.define('goodsAttributeValue', schema, {
    tableName: 'goods_attribute_value',
    freezeTableName: true
  });
  goodsAttributeValue = concatModel(goodsAttributeValue);
  goodsAttributeValue.associate = () => {
    goodsAttributeValue.belongsTo(app.model.models.goodsAttribute, {
      foreignKey: 'goods_attribute_id',
      targetKey: 'goods_attribute_id'
    });
    goodsAttributeValue.belongsTo(app.model.models.Goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return goodsAttributeValue;
};
