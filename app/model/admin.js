'use strict';
module.exports = app => {
  const {
    model,
    Sequelize
  } = app;
  const Op = Sequelize.Op;
  const {
    schema
  } = require('../schema/admin.js')(app);
  const Admin = model.define('admin', schema);

  Admin.getAdminList = async () => {
    return await Admin.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        [Op.or]: [{
            userType: 'admin'
          },
          {
            name: "管理员"
          }
        ]
      }
    });
  }

  return Admin;
}
