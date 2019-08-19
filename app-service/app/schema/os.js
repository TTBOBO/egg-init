'use strict';
module.exports = app => {
  const { STRING, DATE, UUIDV1 } = app.Sequelize;
  return {
    schema: {
      loadavgid: {
        type: STRING(38),
        allowNull: false,
        defaultValue: UUIDV1,
        primaryKey: true
      },
      one: {
        type: STRING(10),
        allowNull: false
      },
      five: {
        type: STRING(10),
        allowNull: false
      },
      fifteen: {
        type: STRING(10),
        allowNull: false
      },
      cpuUsage: {
        type: STRING(10),
        allowNull: false,
        comment: 'cpu(cpu * 100 %)'
      },
      freeMem: {
        type: STRING(10),
        allowNull: false,
        comment: '空闲内存(G)'
      },
      totalMem: {
        type: STRING(10),
        allowNull: false,
        comment: '总内存(G)'
      },
      usedMem: {
        type: STRING(10),
        allowNull: false,
        comment: '内存使用率(men *100 %)'
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date(),
        comment: '创建时间'
      }
    },
    option: {}
  };
};
