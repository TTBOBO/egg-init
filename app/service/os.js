'use strict';

const Service = require('egg').Service;
class Os extends Service {
  async createOs(osData) {
    const { one, five, fifteen, cpuUsage, freeMem, totalMem, usedMem } = osData;
    await this.app.model.Os.createOne({
      one,
      five,
      fifteen,
      cpuUsage,
      freeMem,
      totalMem,
      usedMem
    });
  }
}

module.exports = Os;
