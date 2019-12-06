'use strict';
module.exports = app => {
  const { STRING, DATE, UUIDV1, ENUM, DECIMAL } = app.Sequelize;
  return {
    schema: {
      orderId: {
        type: STRING(38),
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      status: {
        type: ENUM(
          'initial',
          'audited',
          'dispatching',
          'completed',
          'canceled'
        ),
        comment:
          "{initial: '待处理', audited: '已接单', dispatching: '配送中', completed: '已完成', canceled: '已取消'}"
      },
      billNumber: {
        type: STRING(38),
        allowNull: false
      },
      shopName: STRING(76),
      remark: STRING(255),
      freightAmount: {
        type: DECIMAL,
        comment: '运费金额'
      },
      paymentAmount: {
        type: DECIMAL,
        comment: '付款金额'
      },
      reductionAmount: {
        type: DECIMAL,
        comment: '折扣金额',
        defaultValue: 0.0
      },
      totalAmount: {
        type: DECIMAL,
        comment: '总金额'
      }
    },
    option: {
      comment: '订单表'
    }
  };
};
