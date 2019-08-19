'use strict';
const fs = require('fs');
const path = require('path');
const folderPath = path.join('./', 'app/schema');
const uuidv1 = require('uuid/v1');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        const filePath = path.join('../../app/schema', file);
        const { schema, options } = require(filePath)({
          Sequelize
        });
        await queryInterface.createTable(file.replace('.js', ''), schema, {
          ...options,
          freezeTableName: true
        });
      }
      await queryInterface.bulkInsert('admin', [
        {
          uuid: uuidv1(),
          lastModifierTime: new Date(),
          lastModifierName: 'system',
          lastModifierId: 'system',
          createdTime: new Date(),
          creatorName: 'system',
          creatorId: 'system',
          userType: 'admin',
          name: '管理员',
          userName: 'admin',
          password: 'admin'
        }
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  down: async queryInterface => {
    await queryInterface.dropAllTables();
  }
};
