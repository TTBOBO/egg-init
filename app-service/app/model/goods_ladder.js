'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_ladder.js')(app);
  let GoodsLadder = model.define('goodsLadder', schema, {
    tableName: 'goods_ladder',
    freezeTableName: true
  });
  GoodsLadder = concatModel(GoodsLadder);
  GoodsLadder.associate = () => {
    // GoodsLadder.belongsTo(app.model.models.goods, {
    //   foreignKey: 'goodsId',
    //   targetKey: 'goodsId'
    // });
  };
  return GoodsLadder;
};
