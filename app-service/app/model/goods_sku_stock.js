'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods_sku_stock.js')(app);
  let GoodsSku = model.define('GoodsSku', schema);
  GoodsSku = concatModel(GoodsSku);
  GoodsSku.associate = () => {
    GoodsSku.belongsTo(app.model.models.Goods);
  };
  return GoodsSku;
};
