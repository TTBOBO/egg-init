'use strict';
module.exports = app => {
  const { model } = app;
  // const Op = Sequelize.Op;

  const { schema } = require('../schema/admin.js')(app);
  const Admin = model.define('admin', schema);
  Admin.getAdminList = async () => {
    return await Admin.destroy({
      where: {
        userName: 'admin8'
      }
    });
    // return await Admin.findCreateFind({
    //   where: {
    //     userName: "admin7"
    //   },
    //   defaults: {
    //     lastModifierName: 'system2',
    //     lastModifierId: 'system2',
    //     creatorName: 'system2',
    //     creatorId: 'system2',
    //     userType: 'admin',
    //     name: '管理员2',
    //     userName: 'admin7',
    //     password: 'admin'
    //   }
    // })
    // return await Admin.update({
    //   name: "管理员2"
    // }, {
    //   where: {
    //     name: "管理员1"
    //   }
    // })
    // return await Admin.count({
    //   // attributes: {
    //   //   exclude: ['password'],
    //   // },

    //   where: {
    //     // createdTime: {
    //     //   [Op.notBetween]: ["2019-08-14 09:28:20", "2019-08-15 09:28:25"]
    //     // }
    //     name: {
    //       [Op.startsWith]: '管理员'
    //     }
    //   },
    //   // offset: 0,
    //   // limit: 1
    // });
    // return await Admin.findByPk('a1e86d50-be86-11e9-a542-ff069356da44')
  };

  return Admin;
};
