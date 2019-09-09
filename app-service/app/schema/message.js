'use strict';
module.exports = app => {
  const { STRING, UUIDV1, ENUM } = app.Sequelize;
  return {
    schema: {
      mid: {
        type: STRING(38),
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
      },
      name: STRING(76),
      isRead: {
        type: ENUM('1', '2'),
        comment: '1 未读、2 已读',
        defaultValue: '1'
      },
      status: {
        type: ENUM('1', '2'),
        comment: '1 未处理 2 已处理',
        defaultValue: '1'
      },
      type: {
        type: ENUM('order', 'goods'),
        comment: '1 订单  2 商品'
      }
    },
    option: {
      comment: '消息表'
    }
  };
};
