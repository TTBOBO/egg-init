'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/flash_promotion_goods.js')(app);
  let FlashPromotionGoods = model.define('flashPromotionGoods', schema, {
    tableName: 'flash_promotion_goods',
    freezeTableName: true
  });
  FlashPromotionGoods = concatModel(FlashPromotionGoods);
  FlashPromotionGoods.associate = () => {
    FlashPromotionGoods.belongsTo(model.models.goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });

    FlashPromotionGoods.belongsTo(model.models.flashPromotion, {
      foreignKey: 'promotionId',
      targetKey: 'id'
    });
    // FlashPromotionGoods.hasMany(app.model.Admin, {
    //   foreignKey: 'uuid',
    //   targetKey: 'uuid'
    // });
  };
  return FlashPromotionGoods;
};
