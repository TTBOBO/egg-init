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
      name: {
        type: STRING(100),
        comment: '名称'
      },
      type: {
        type: INTEGER.UNSIGNED,
        comment: '上下线状态：0->pc首页轮播；1->手机端首页轮播',
        defaultValue: 1
      },
      pic: {
        type: STRING(500),
        comment: '图片地址'
      },
      start_date: {
        type: DATE,
        comment: '开始日期'
      },
      end_date: {
        type: DATE,
        comment: '结束日期'
      },
      clickCount: {
        type: INTEGER.UNSIGNED,
        comment: '点击数'
      },
      url: {
        type: STRING(500),
        comment: '链接地址'
      },
      note: {
        type: STRING(500),
        comment: '备注'
      },
      status: {
        type: INTEGER.UNSIGNED,
        comment: '上下线状态：0->下线；1->上线'
      },
      sort: {
        type: INTEGER.UNSIGNED,
        comment: '排序'
      }
    },
    options: {
      comment: '首页轮播广告表' // comment for table
    }
  };
};
