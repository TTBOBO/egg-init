'use strict';

module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/user.js')(app);
  const User = model.define('user', schema);
  return User;
};
