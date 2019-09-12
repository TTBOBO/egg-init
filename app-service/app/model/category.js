'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const { model } = app;
  const { schema } = require('../schema/category.js')(app);
  let Category = model.define('category', schema);
  Category = concatModel(Category);
  Category.associate = () => {
    Category.hasMany(app.model.Goods, {
      // foreignKey: 'categoryId',
      // targetKey: 'categoryId'
    });
  };
  return Category;
};
