'use strict';
module.exports = app => {
  const { STRING, TEXT, FLOAT, UUIDV1 } = app.Sequelize;
  return {
    schema: {
      commentId: {
        type: STRING(38),
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
      },
      score: {
        type: FLOAT(2, 1),
        allowNull: false
      },
      comment: {
        type: TEXT,
        comment: '评语'
      }
    },
    options: {
      comment: '评论表'
    }
  };
};
