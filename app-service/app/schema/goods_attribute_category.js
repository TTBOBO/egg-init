'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return {
    schema: {
      goods_attribute_category_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: STRING(64),
        comment: '名称'
      },
      attributeCount: {
        type: INTEGER,
        comment: '属性数量',
        defaultValue: 0
      },
      paramCount: {
        type: INTEGER,
        comment: '参数数量',
        defaultValue: 0
      }
    },
    options: {
      comment: '商品属性分类表' // comment for table
    }
  };
};
