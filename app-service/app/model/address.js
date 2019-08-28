'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/address.js')(app);
  let Address = model.define('address', schema);
  Address = concatModel(Address);
  return Address;
};
