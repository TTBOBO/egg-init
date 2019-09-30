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
      fullPrice: {
        type: DECIMAL(10, 2),
        comment: '商品满足金额'
      },
      reducePrice: {
        type: DECIMAL(10, 2),
        comment: '商品减少金额'
      }
    },
    options: {
      comment: '商品满减表' // comment for table
    }
  };
};
