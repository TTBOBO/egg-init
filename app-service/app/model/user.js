'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/user.js')(app);

  let User = model.define('user', schema, {
    freezeTableName: true,
    tableName: 'user'
  });
  User = concatModel(User);
  User.associate = () => {
    console.log(app.model);
    User.hasOne(app.model.UserInfo, { foreignKey: 'userid' });
    User.hasMany(app.model.Task, {
      foreignKey: 'userid',
      targetKey: 'uuid'
    });
  };
  return User;
};
