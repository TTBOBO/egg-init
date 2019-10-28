'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/home_advertise.js')(app);
  let HomeAdvertise = model.define('homeAdvertise', schema, {
    tableName: 'home_advertise',
    freezeTableName: true
  });
  HomeAdvertise = concatModel(HomeAdvertise);
  HomeAdvertise.associate = () => {};
  return HomeAdvertise;
};
