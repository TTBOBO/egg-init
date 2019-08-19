'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/os.js')(app);
  let Loadavg = model.define('os', schema);
  Loadavg = concatModel(Loadavg);

  return Loadavg;
};
