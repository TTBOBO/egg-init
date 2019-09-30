'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods_full_reduction.js')(app);
  let goodsFullReduction = model.define('goodsFullReduction', schema);
  goodsFullReduction = concatModel(goodsFullReduction);
  goodsFullReduction.associate = () => {
    goodsFullReduction.belongsTo(app.model.models.Goods);
  };
  return goodsFullReduction;
};
