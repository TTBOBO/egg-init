'use strict';
module.exports = app => {
  const {
    ENUM,
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
      name: {
        type: STRING(200),
        comment: '标题'
      },
      start_date: {
        type: DATE,
        comment: '开始日期'
      },
      end_date: {
        type: DATE,
        comment: '结束日期'
      },
      status: {
        type: ENUM('0', '1'),
        comment: '上下线状态'
      }
    },
    options: {
      comment: '限时购表' // comment for table
    }
  };
};
