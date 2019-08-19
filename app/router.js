'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // app.beforeStart(async () => {
  //   await app.model.sync({
  //     alter: true
  //   });
  // });
  router.get('/', controller.home.index);
  router.post('/login', controller.user.common.login);
  router.get('/deleteAdmin', controller.home.deleteAdmin);
  router.get('/exec', controller.home.exec);
};
