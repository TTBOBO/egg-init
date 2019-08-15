'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV1, ENUM } = app.Sequelize;
  return {
    schema: {
      uuid: {
        type: STRING(38),
        allowNull: false,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      lastModifierTime: {
        type: DATE,
        allowNull: false
      },
      lastModifierName: {
        type: STRING(76),
        allowNull: false
      },
      lastModifierId: {
        type: STRING(38),
        allowNull: false,
        comment: '最后修改人的id'
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        comment: '创建时间'
      },
      creatorName: {
        type: STRING(76),
        allowNull: false,
        comment: '创建用户名'
      },
      creatorId: {
        type: STRING(38),
        allowNull: false,
        comment: '创建用户id'
      },
      userType: {
        type: ENUM('admin'),
        allowNull: true
      },
      name: {
        type: STRING(76),
        allowNull: false,
        comment: '用户名称'
      },
      userName: {
        type: STRING(12),
        allowNull: false,
        unique: true,
        comment: '用户名'
      },
      password: {
        type: STRING(100),
        allowNull: false
      }
    },
    options: {
      comment: '管理员表' // comment for table
    }
  };
};
