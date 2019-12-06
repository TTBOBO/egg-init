'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/flash_promotion.js')(app);
  let FlashPromotion = model.define('flashPromotion', schema, {
    tableName: 'flash_promotion',
    freezeTableName: true
  });
  FlashPromotion = concatModel(FlashPromotion);
  FlashPromotion.associate = () => {

    // FlashPromotion.hasMany(app.model.FlashPromotionGoods, {
    //   foreignKey: 'flash_promotion_id',
    //   targetKey: 'id'
    // });
  };
  return FlashPromotion;
};
