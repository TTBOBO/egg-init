'use strict';
module.exports = app => {
  const { STRING, DATE, INTEGER, BOOLEAN, ENUM } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      creatorId: {
        type: STRING(38),
        allowNull: false
      },
      phone: {
        type: STRING(20),
        allowNull: false
      },
      linkMan: {
        type: STRING(60),
        allowNull: false
      },
      isDefault: {
        type: BOOLEAN,
        defaultValue: false
      },
      address: {
        type: STRING(255),
        allowNull: false
      },
      sex: {
        type: ENUM('man', 'female'),
        comment: '用户性别  { man: "男", female: "女" }',
        defaultValue: 'man'
      }
    },
    options: {
      comment: '地址表' // comment for table
    }
  };
};
