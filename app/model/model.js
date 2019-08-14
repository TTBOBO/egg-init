'use strict';
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/admin.js')(app);
  const Admin = model.define('admin', schema);
  return Admin;
}
