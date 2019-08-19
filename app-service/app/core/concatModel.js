'use strict';
const BaseModel = require('./base');
module.exports = model => {
  let baseModel = new BaseModel(model);
  baseModel.baseFun.forEach(item => {
    model[item] = baseModel[item];
  });
  return model;
};
