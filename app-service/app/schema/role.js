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
        comment: '角色名称'
      },
      des: {
        type: STRING(1000),
        comment: '角色说明'
      },
      status: {
        type: INTEGER.UNSIGNED,
        comment: '删除状态：0->删除；1->未删除',
        defaultValue: 0
      }
    },
    options: {
      comment: '角色表' // comment for table
    }
  };
};
