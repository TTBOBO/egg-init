'use strict';
module.exports = app => {
  const {
    ENUM,
    INTEGER,
    STRING
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
        type: STRING(20),
        comment: '开始日期'
      },
      end_date: {
        type: STRING(20),
        comment: '结束日期'
      },
      status: {
        type: ENUM('0', '1'),
        comment: '启用状态：0->不启用；1->启用'
      }
    },
    options: {
      comment: '限时购场次表' // comment for table
    }
  };
};
