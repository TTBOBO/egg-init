'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goods.js')(app);

  let Goods = model.define('goods', schema);
  Goods = concatModel(Goods);
  Goods.associate = () => {
    // console.log(app.model);
  };
  return Goods;
};
