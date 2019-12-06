'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/role.js')(app);
  let Role = model.define('role', schema, {
    tableName: 'role',
    freezeTableName: true
  });
  Role = concatModel(Role);
  Role.associate = () => {};
  return Role;
};
