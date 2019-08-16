'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/user.js')(app);
  let User = model.define('user', schema);
  User = concatModel(User);
  return User;
};
