'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_attribute_value')(app);

  let GoodsAttributeValue = model.define('goodsAttributeValue', schema, {
    tableName: 'goods_attribute_value',
    freezeTableName: true
  });
  GoodsAttributeValue = concatModel(GoodsAttributeValue);
  GoodsAttributeValue.associate = () => {
    GoodsAttributeValue.belongsTo(app.model.models.goodsAttribute, {
      foreignKey: 'goods_attribute_id',
      targetKey: 'goods_attribute_id'
    });
    // GoodsAttributeValue.belongsTo(app.model.models.goods, {
    //   foreignKey: 'goodsId',
    //   targetKey: 'goodsId'
    // });
  };
  return GoodsAttributeValue;
};
