'use strict';
module.exports = app => {
  const { STRING, UUIDV1, INTEGER } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        // defaultValue: UUIDV1,
        autoIncrement: true
      },
      age: {
        type: STRING(4)
      },
      address: {
        type: STRING(100),
        allowNull: false
      }
    },
    option: {}
  };
};
