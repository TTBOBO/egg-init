'use strict';
module.exports = app => {
  const {
    INTEGER
  } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      recommend_status: {
        type: INTEGER.UNSIGNED,
        comment: '推荐状态：0->不推荐；1->推荐'
      },
      sort: {
        type: INTEGER.UNSIGNED,
        comment: '排序'
      }
    },
    options: {
      comment: '首页专题推荐表' // comment for table
    }
  };
};
