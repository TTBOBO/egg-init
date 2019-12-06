'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_member_price.js')(app);
  let GoodsMemberPrice = model.define('goodsMemberPrice', schema, {
    tableName: 'goods_member_price',
    freezeTableName: true
  });
  GoodsMemberPrice = concatModel(GoodsMemberPrice);
  GoodsMemberPrice.associate = () => {
    // GoodsMemberPrice.belongsTo(app.model.models.goods, {
    //   foreignKey: 'goodsId',
    //   targetKey: 'goodsId'
    // });
  };
  return GoodsMemberPrice;
};
