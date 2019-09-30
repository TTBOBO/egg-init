'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods.js')(app);
  let Goods = model.define('Goods', schema);
  Goods = concatModel(Goods);
  Goods.associate = () => {
    Goods.belongsTo(model.Category);
    Goods.belongsTo(model.models.goodsAttributeCategory, {
      foreignKey: 'goods_attribute_category_id',
      targetKey: 'goods_attribute_category_id'
    });
  };
  return Goods;
};
