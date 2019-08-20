'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/os.js')(app);
  let Os = model.define('os', schema);
  Os = concatModel(Os);

  return Os;
};
