'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/flash_promotion_log.js')(app);
  let FlashPromotionLog = model.define('flashPromotionLog', schema, {
    tableName: 'flash_promotion_log',
    freezeTableName: true
  });
  FlashPromotionLog = concatModel(FlashPromotionLog);
  FlashPromotionLog.associate = () => {
    FlashPromotionLog.belongsTo(app.model.models.user, {
      foreignKey: 'uuid',
      targetKey: 'uuid'
    });
    FlashPromotionLog.belongsTo(app.model.models.goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return FlashPromotionLog;
};
