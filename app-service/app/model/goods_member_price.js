'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods_member_price.js')(app);
  let goodsMemberPrice = model.define('goodsMemberPrice', schema);
  goodsMemberPrice = concatModel(goodsMemberPrice);
  goodsMemberPrice.associate = () => {
    goodsMemberPrice.belongsTo(app.model.models.Goods);
  };
  return goodsMemberPrice;
};
