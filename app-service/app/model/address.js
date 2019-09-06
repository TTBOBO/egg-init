'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/address.js')(app);
  let Address = model.define('address', schema);
  Address = concatModel(Address);
  Address.associate = () => {
    // Customer.hasMany(app.model.Order, {
    //   foreignKey: 'uuid',
    //   targetKey: 'id'
    // });
    Address.belongsTo(app.model.Customer, {
      foreignKey: 'uuid',
      targetKey: 'uuid'
    });
  };
  return Address;
};
