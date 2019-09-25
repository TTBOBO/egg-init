'use strict';
module.exports = app => {
  const { INTEGER } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      value: {
        type: INTEGER,
        comment: '参数数量'
      }
    },
    options: {
      comment: '商品属性值表' // comment for table
    }
  };
};
