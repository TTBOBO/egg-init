'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      member_phone: {
        type: STRING(20),
        comment: '会员电话'
      },
      subscribe_time: {
        type: DATE,
        comment: '会员订阅时间'
      },
      send_time: {
        type: DATE,
        comment: '发送时间'
      }
    },
    options: {
      comment: '限时购通知记录表' // comment for table
    }
  };
};
