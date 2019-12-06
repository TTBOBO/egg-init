'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/flash_promotion_session.js')(app);
  let FlashPromotionSession = model.define('flashPromotionSession', schema, {
    tableName: 'flash_promotion_session',
    freezeTableName: true
  });
  FlashPromotionSession = concatModel(FlashPromotionSession);
  FlashPromotionSession.associate = () => {
    FlashPromotionSession.hasMany(app.model.models.flashPromotionGoods, {
      foreignKey: 'sessionId',
      targetKey: 'id',
      as: 'goods'
    });
  };
  return FlashPromotionSession;
};
