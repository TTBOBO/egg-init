'use strict';
module.exports = app => {
  const {
    STRING,
    INTEGER,
    ENUM
  } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      status: {
        type: ENUM('0', '1', '2'),
        comment: '0 待审核 1 审核通过 2审核失败'
      },
      detail: {
        type: STRING(255),
        comment: '反馈详情'
      }
    },
    options: {
      comment: '商品审核记录表' // comment for table
    }
  };
};
