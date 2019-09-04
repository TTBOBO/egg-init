'use strict';
module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;
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
      categoryName: {
        type: STRING(76),
        allowNull: false
      },
      categoryDes: {
        type: STRING(255),
        comment: '类型描述'
      }
    },
    options: {
      comment: '商品类型表' // comment for table
    }
  };
};
