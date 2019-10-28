'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/home_new_recommend_subject.js')(app);
  let HomeNewRecommendSubject = model.define('homeNewRecommendSubject', schema, {
    tableName: 'home_new_recommend_subject',
    freezeTableName: true
  });
  HomeNewRecommendSubject = concatModel(HomeNewRecommendSubject);
  HomeNewRecommendSubject.associate = () => {
    HomeNewRecommendSubject.belongsTo(app.model.models.goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return HomeNewRecommendSubject;
};
