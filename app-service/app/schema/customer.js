'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nickName: STRING(76),
      authorPic: STRING(76),
      phone: STRING(20)
    },
    option: {
      comment: '用户表'
    }
  };
};
