'use strict';
module.exports = app => {
  const { STRING, DATE, INTEGER, BOOLEAN } = app.Sequelize;
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
      }
    },
    options: {
      comment: '地址表' // comment for table
    }
  };
};
