'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING
  } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      value: {
        type: STRING(24),
        comment: '手动添加规格或参数的值，参数单值，规格有多个时以逗号隔开'
      }
    },
    options: {
      comment: '商品属性值表' // comment for table
    }
  };
};
