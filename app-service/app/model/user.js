'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/user.js')(app);

  let User = model.define('user', schema, {
    freezeTableName: true,
    tableName: 'user'
    // underscored: true // 变量名以下划线模式
  });
  User = concatModel(User);
  User.associate = () => {
    User.hasOne(app.model.UserInfo, { foreignKey: 'userid' });
    User.hasOne(User, { as: 'parent', foreignKey: 'parentId' });
    User.hasMany(app.model.Task, {
      foreignKey: 'userid',
      targetKey: 'uuid',
      as: 'taskdata'
    });
  };
  return User;
};
