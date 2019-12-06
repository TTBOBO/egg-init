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
      }
    },
    options: {
      comment: '商品分类和属性的关系表' // comment for table
    }
  };
};
