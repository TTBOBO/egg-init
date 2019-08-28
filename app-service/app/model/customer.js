'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/customer')(app);
  let Customer = model.define('customer', schema);
  Customer = concatModel(Customer);
  Customer.associate = () => {
    Customer.hasMany(app.model.Order, {
      foreignKey: 'uuid',
      targetKey: 'uuid'
    });
  };
  return Customer;
};
