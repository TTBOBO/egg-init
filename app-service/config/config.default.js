/* eslint valid-jsdoc: "off" */

'use strict';
const moment = require('moment');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
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
      timezone: '+08:00',
      username: 'root',
      password: '123456',
      define: {
        freezeTableName: true,
        createdAt: 'createdTime',
        updatedAt: 'lastModifierTime',
        getterMethods: {
          createdTime() {
            const createdTime = this.getDataValue('createdTime');
            if (createdTime) {
              return moment(createdTime).format('YYYY-MM-DD HH:mm:ss');
            }
          },
          lastModifierTime() {
            const lastModifierTime = this.getDataValue('lastModifierTime');
            if (lastModifierTime) {
              return moment(lastModifierTime).format('YYYY-MM-DD HH:mm:ss');
            }
          },
          start_date() {
            const start_date = this.getDataValue('start_date');
            if (start_date) {
              return moment(start_date).format('YYYY-MM-DD HH:mm:ss');
            }
          },
          end_date() {
            const end_date = this.getDataValue('end_date');
            if (end_date) {
              return moment(end_date).format('YYYY-MM-DD HH:mm:ss');
            }
          }
        }
      }
    },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: [ 'http://10.6.52.41:8080' ]
    },
    cors: {
      origin: 'http://10.6.52.41:8080',
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    },
    multipart: {
      fileExtensions: [ '.py' ]
    },
    jwt: {
      secret: 'application'
    },
    openCos: true, // 是否上传到 cos 云储存里面
    cos: {
      Appid: '1251403076',
      SecretId: 'AKIDwga7SX6tAk58PcoFKFxOcePt51mEeNDn',
      SecretKey: 'TjodF4d192hBP4SZUBLGDvNdmgCTUJre',
      Bucket: 'tab-1251403076',
      Region: 'ap-shenzhen-fsi',
      baseUrl: 'https://tab-1251403076.cos.ap-shenzhen-fsi.myqcloud.com'
    },
    wxConfig: {
      appid: 'wx0e83a3ae059a43c1',
      secret: '06de045d79bfa38c7cb8e7bf59fb31bd'
    },
    uplaodBasePath: 'app/public/upload/'
  });
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565625687216_9155';

  // add your middleware config here
  config.middleware = [ 'auth', 'dataHandler' ];
  // egg-grpc配置
  config.grpc = {
    endpoint: 'localhost:50051' // 服务端地址
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  return {
    ...config,
    ...userConfig
  };
};
