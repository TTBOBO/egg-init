'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods.js')(app);
  let Goods = model.define('Goods', schema);
  Goods = concatModel(Goods);
  Goods.associate = () => {
    Goods.belongsTo(app.model.Category);
  };
  return Goods;
};
