'use strict';
module.exports = app => {
  const { DECIMAL, INTEGER } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      count: {
        type: INTEGER.UNSIGNED,
        comment: '满足的商品数量'
      },
      discount: {
        type: DECIMAL(10, 2),
        comment: '折扣'
      },
      price: {
        type: DECIMAL(10, 2),
        comment: '折后价格'
      }
    },
    options: {
      comment: '商品阶梯价格表' // comment for table
    }
  };
};
