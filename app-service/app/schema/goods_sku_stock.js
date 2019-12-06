'use strict';
module.exports = app => {
  const { STRING, DECIMAL, INTEGER } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      skuCode: {
        type: STRING(64),
        allowNull: true,
        comment: 'sku编码'
      },
      price: {
        type: DECIMAL(10, 2),
        comment: '价格'
      },
      stock: {
        type: INTEGER.UNSIGNED,
        defaultValue: 0,
        comment: '库存'
      },
      lowStock: {
        type: INTEGER.UNSIGNED,
        comment: '预警库存'
      },
      sp1: {
        type: STRING(64),
        comment: 'sku编码'
      },
      sp2: {
        type: STRING(64),
        comment: 'sku编码'
      },
      sp3: {
        type: STRING(64),
        comment: 'sku编码'
      },
      sale: {
        type: INTEGER.UNSIGNED,
        comment: '销量'
      }
    },
    options: {
      comment: '商品sku表' // comment for table
    }
  };
};
