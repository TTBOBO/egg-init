'use strict';
module.exports = app => {
  const { STRING, DATE, INTEGER } = app.Sequelize;
  return {
    schema: {
      categoryId: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      categoryName: STRING(76),
      categoryDes: {
        type: STRING(255),
        comment: '类型描述'
      }
    },
    option: {
      comment: '商品类型表'
    }
  };
};
