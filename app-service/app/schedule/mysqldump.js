'use strict';
const { exec } = require('child_process');
module.exports = {
  schedule: {
    cron: '*/10 * * * * *',
    disable: true,
    type: 'all'
  },
  async task() {
    console.log(12222);
    exec(
      'mysqldump -u root -p egg-init-shop > C:/Users/Administrator/Desktop/egg/egg-init-shop.sql',
      (err, stdout, stderr) => {
        if (stdout) {
          exec('123456', (err, stdout, stderr) => {
            console.log(err, stdout, stderr);
          });
        }
        console.log(err, stdout, stderr);
      }
    );
  }
};
