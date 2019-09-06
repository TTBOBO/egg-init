'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/order.js')(app);

  let Order = model.define('order', schema);
  Order = concatModel(Order);
  Order.associate = () => {
    Order.belongsTo(app.model.Address);
    Order.belongsTo(app.model.Customer, {
      foreignKey: 'uuid',
      targetKey: 'uuid'
    });
  };
  return Order;
};
