'use strict';
const concatModel = require('../core/concatModel');
module.exports = app => {
  const {
    model
  } = app;
  const {
    schema
  } = require('../schema/goods_vertify_record.js')(app);
  let GoodsVertifyRecord = model.define('goodsVertifyRecord', schema, {
    tableName: 'goods_vertify_record',
    freezeTableName: true
  });
  GoodsVertifyRecord = concatModel(GoodsVertifyRecord);
  GoodsVertifyRecord.associate = () => {
    GoodsVertifyRecord.belongsTo(app.model.Admin, {
      foreignKey: 'uuid',
      targetKey: 'uuid'
    });
  };
  return GoodsVertifyRecord;
};
