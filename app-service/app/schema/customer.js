'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return {
    schema: {
      uuid: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nickName: STRING(76),
      province: STRING(20),
      gender: INTEGER.UNSIGNED,
      avatarUrl: STRING(200),
      openid: STRING(76),
      phone: STRING(20)
    },
    option: {
      comment: '用户表'
    }
  };
};
