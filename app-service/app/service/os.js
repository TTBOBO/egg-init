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
  async getNetworkIo() {
    const {
      Sequelize: { Op }
    } = this.app;
    return await this.app.model.Os.grid({
      pagination: { page: 1 },
      type: 'findAll',
      where: {
        createdTime: {
          [Op.between]: [ '2019-08-19 00:00:00', '2019-08-19 19:33:34' ]
        }
      }
    });
  }
}

module.exports = Os;
