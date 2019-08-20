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
        allowNull: false,
        defaultValue: ''
      },
      lastModifierId: {
        type: STRING(38),
        allowNull: false,
        comment: '最后修改人的id',
        defaultValue: ''
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
        comment: '创建时间'
      },
      creatorName: {
        type: STRING(76),
        allowNull: false,
        comment: '创建用户名',
        defaultValue: ''
      },
      creatorId: {
        type: STRING(38),
        allowNull: false,
        comment: '创建用户id',
        defaultValue: ''
      },
      userType: {
        type: ENUM('admin'),
        allowNull: true,
        defaultValue: 'admin'
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
      },
      ip: {
        type: STRING(38),
        allowNull: false,
        comment: '登录ip'
      }
    },
    options: {
      comment: '管理员表' // comment for table
    }
  };
};
