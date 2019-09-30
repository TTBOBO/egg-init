'use strict';
module.exports = app => {
  const { DECIMAL, INTEGER, BIGINT } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      memberLevelId: {
        type: BIGINT(10, 2),
        comment: '会员等级id'
      },
      memberPrice: {
        type: DECIMAL(10, 2),
        comment: '会员价格'
      }
    },
    options: {
      comment: '商品会员价格表' // comment for table
    }
  };
};
