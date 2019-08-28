'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/userInfo')(app);

  let UserInfo = model.define('userinfo', schema, {
    tableName: 'user_info',
    freezeTableName: true
  });
  UserInfo = concatModel(UserInfo);
  UserInfo.associate = () => {
    UserInfo.belongsTo(app.model.User, {
      foreignKey: 'userid', // 将 userid 作为外键 添加到 UserInfo
      targetKey: 'uuid', // 对应user表目标键为uuid的值
      as: 'userTable'
    });
  };
  return UserInfo;
};
