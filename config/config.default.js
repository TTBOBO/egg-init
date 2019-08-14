/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    cluster: {
      listen: {
        port: 7002,
        hostname: '127.0.0.1'
      }
    },
    mysql: {
      client: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '123456',
        database: 'egg-init-shop'
      }
    },
    sequelize: {
      dialect: 'mysql',
      database: 'egg-init-shop',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      define: {
        freezeTableName: true,
        createdAt: 'createdTime',
        updatedAt: 'lastModifiedTime',
      }
    }
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565625687216_9155';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig
  };
};
