'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_sku_stock.js')(app);
  let GoodsSku = model.define('goodsSku', schema, {
    tableName: 'goods_sku_stock',
    freezeTableName: true
  });
  GoodsSku = concatModel(GoodsSku);
  GoodsSku.associate = () => {
    // GoodsSku.belongsTo(app.model.models.goods, {
    //   foreignKey: 'goodsId',
    //   targetKey: 'goodsId'
    // });
  };
  return GoodsSku;
};
