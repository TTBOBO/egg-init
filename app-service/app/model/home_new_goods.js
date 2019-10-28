'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/home_new_goods.js')(app);
  let HomeNewGoods = model.define('homeNewGoods', schema, {
    tableName: 'home_new_goods',
    freezeTableName: true
  });
  HomeNewGoods = concatModel(HomeNewGoods);
  HomeNewGoods.associate = () => {
    HomeNewGoods.belongsTo(app.model.models.goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return HomeNewGoods;
};
