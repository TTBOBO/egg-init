'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/home_recommend_goods.js')(app);
  let HomeRecommendGoods = model.define('homeRecommendGoods', schema, {
    tableName: 'home_recommend_goods',
    freezeTableName: true
  });
  HomeRecommendGoods = concatModel(HomeRecommendGoods);
  HomeRecommendGoods.associate = () => {
    HomeRecommendGoods.belongsTo(app.model.models.goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return HomeRecommendGoods;
};
