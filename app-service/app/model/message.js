'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/message.js')(app);
  let Message = model.define('message', schema);
  Message = concatModel(Message);

  return Message;
};
