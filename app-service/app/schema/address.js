'use strict';
module.exports = app => {
  const { STRING, INTEGER, ENUM } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
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
        type: ENUM('is', 'no'),
        comment: '是否为默认  { is: "是", female: "否" }'
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
