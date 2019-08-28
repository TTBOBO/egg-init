'use strict';
module.exports = app => {
  const { STRING, DATE, UUIDV1 } = app.Sequelize;
  return {
    schema: {
      uuid: {
        type: STRING(38),
        primarykey: true,
        allowNull: false,
        defalutValue: UUIDV1
      },
      createdTime: {
        type: DATE,
        allowNull: false
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
