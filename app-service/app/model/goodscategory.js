'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/goodscategory.js')(app);
  let GoodsCategory = model.define('GoodsCategory', schema);
  GoodsCategory = concatModel(GoodsCategory);
  GoodsCategory.associate = () => {
    GoodsCategory.hasMany(app.model.Goods, {
      foreignKey: 'categoryId',
      targetKey: 'categoryId'
    });
  };
  return GoodsCategory;
};
