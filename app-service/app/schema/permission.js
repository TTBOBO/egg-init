'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING
  } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      name: {
        type: STRING(100),
        comment: '权限名称'
      },
      des: {
        type: STRING(1000),
        comment: '权限说明'
      },
      parentId: {
        type: INTEGER.UNSIGNED,
        comment: '上级编号'
      },
      status: {
        type: INTEGER.UNSIGNED,
        comment: '删除状态：0->删除；1->未删除',
        defaultValue: 0
      }
    },
    options: {
      comment: '权限表' // comment for table
    }
  };
};
