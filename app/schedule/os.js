'use strict';
let osUtils = require('os-utils');
module.exports = {
  schedule: {
    cron: '0 */2 * * * *',
    type: 'all',
    disable: false,
    immediate: false
  },
  async task(ctx) {
    const os = require('os');
    const [ one, five, fifteen ] = os.loadavg();
    let freeMem = os.freemem() / 1024 / 1024 / 1024;
    let totalMem = os.totalmem() / 1024 / 1024 / 1024;
    osUtils.cpuUsage(async function(value) {
      let osData = {
        cpuUsage: value.toFixed(2),
        freeMem: freeMem.toFixed(2),
        totalMem: totalMem.toFixed(2),
        usedMem: (totalMem - freeMem).toFixed(2),
        MemUsage: ((totalMem - freeMem) / totalMem).toFixed(2),
        one,
        five,
        fifteen
      };
      await ctx.service.os.createOs(osData);
    });
  }
};
