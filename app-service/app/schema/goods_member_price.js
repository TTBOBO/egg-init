'use strict';
module.exports = app => {
  const { DECIMAL, INTEGER, ENUM } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      memberLevelId: {
        type: ENUM('gold', 'platinum', 'diamond'),
        comment: '会员等级 gold 黄金会员、 platinum 白金会员、diamond 钻石会员'
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
