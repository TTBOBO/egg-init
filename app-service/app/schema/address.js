'use strict';
module.exports = app => {
  const { STRING, DATE, UUIDV1, BOOLEAN } = app.Sequelize;
  return {
    schema: {
      addressid: {
        type: STRING(38),
        primarykey: true,
        allowNull: false,
        defaultValue: UUIDV1
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
