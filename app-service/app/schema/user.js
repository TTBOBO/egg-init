'use strict';

module.exports = app => {
  const { STRING, DATE, UUIDV1, ENUM } = app.Sequelize;
  return {
    schema: {
      uuid: {
        type: STRING(38),
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV1
      },
      lastModifierTime: {
        type: DATE,
        allowNull: false
      },
      lastModifierName: {
        type: STRING(76),
        allowNull: false
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        comment: '创建时间',
        defaultValue: new Date()
      },
      creatorName: {
        type: STRING(76),
        allowNull: false,
        comment: '创建人用户名'
      },
      name: {
        type: STRING(76),
        allowNull: false,
        unique: true,
        comment: '用户名'
      },
      password: {
        type: STRING(100),
        allowNull: false,
        comment: '密码'
      },
      enableStatus: {
        type: ENUM('0', '1'),
        comment: '用户状态 0 禁用状态 1可使用状态',
        defaultValue: '1'
      },
      address: {
        type: STRING(255),
        comment: '用户地址'
      },
      mobilPhone: {
        type: STRING(12),
        comment: '用户号码'
      }
    },
    options: {
      comment: '用户表' // comment for table
    }
  };
};
