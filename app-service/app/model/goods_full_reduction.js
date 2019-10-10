'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_full_reduction.js')(app);
  let GoodsFullReduction = model.define('goodsFullReduction', schema, {
    tableName: 'goods_full_reduction',
    freezeTableName: true
  });
  GoodsFullReduction = concatModel(GoodsFullReduction);
  GoodsFullReduction.associate = () => {
    GoodsFullReduction.belongsTo(app.model.models.goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return GoodsFullReduction;
};
