'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/task')(app);
  let Task = model.define('task', schema, {
    freezeTableName: true,
    tableName: 'task'
  });
  Task = concatModel(Task);
  Task.associate = () => {
    Task.belongsTo(app.model.User, {
      foreignKey: 'userid',
      targetKey: 'uuid'
    });
  };

  return Task;
};
