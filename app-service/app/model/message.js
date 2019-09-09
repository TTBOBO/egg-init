'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/message.js')(app);
  let Message = model.define('message', schema);
  Message = concatModel(Message);
  Message.associate = () => {
    Message.belongsTo(app.model.Order, {
      foreignKey: 'orderId',
      targetKey: 'orderId'
    });
    Message.belongsTo(app.model.Goods, {
      foreignKey: 'goodsId',
      targetKey: 'goodsId'
    });
  };
  return Message;
};
