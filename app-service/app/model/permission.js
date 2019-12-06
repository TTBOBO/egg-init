'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/permission.js')(app);
  let Permission = model.define('permission', schema, {
    tableName: 'permission',
    freezeTableName: true
  });
  Permission = concatModel(Permission);
  Permission.associate = () => {};
  return Permission;
};
