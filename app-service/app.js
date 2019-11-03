'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    console.log('start');
    // await app.runSchedule('test');
  });
};
