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
        comment: '推荐状态：0->不推荐；1->推荐',
        defaultValue: 0
      },
      sort: {
        type: INTEGER.UNSIGNED,
        comment: '排序',
        defaultValue: 10
      }
    },
    options: {
      comment: '新品推荐商品表' // comment for table
    }
  };
};
