'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      parentId: {
        type: INTEGER.UNSIGNED,
        comment: '上级分类编号'
      },
      level: {
        type: INTEGER,
        defaultValue: 0,
        comment: '分类级别：0->1级；1->2级'
      },
      productCount: {
        type: INTEGER,
        comment: '分类级别：0->1级；1->2级'
      },
      productUnit: {
        type: STRING(64),
        comment: '商品单位'
      },
      showStatus: {
        type: STRING(1),
        defaultValue: '1',
        comment: '显示状态：0->不显示；1->显示'
      },
      icon: {
        type: STRING(225),
        comment: '图标'
      },
      keywords: {
        type: STRING(225),
        comment: '关键字'
      },
      // createdTime: {
      //   type: DATE,
      //   allowNull: false,
      //   defaultValue: new Date()
      // },
      categoryName: {
        type: STRING(76),
        allowNull: false
      },
      categoryDes: {
        type: STRING(255),
        comment: '类型描述'
      }
    },
    options: {
      comment: '商品类型表' // comment for table
    }
  };
};
