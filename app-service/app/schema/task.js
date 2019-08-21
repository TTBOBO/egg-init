'use strict';

module.exports = app => {
  const { STRING, UUIDV1 } = app.Sequelize;
  return {
    schema: {
      taskid: {
        type: STRING(38),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV1
      },
      taskname: {
        type: STRING(38),
        allowNull: false
      },
      taskInfo: {
        type: STRING(225),
        allowNull: false
      }
    },
    option: {}
  };
};
