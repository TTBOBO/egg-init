'use strict';

const Service = require('egg').Service;
class SmsHome extends Service {
  async getSmsList({
    page,
    size,
    name,
    sort_type,
    sort_by,
    model = 'HomeNewGoods',
    recommend_status
  }) {
    const {
      app
    } = this;
    const {
      Sequelize: {
        Op
      }
    } = app;
    if (recommend_status) {
      var where = {
        recommend_status
      };
    }
    let option = {
      pagination: {
        page,
        size
      },
      where,
      sort: [ sort_by, sort_type ]
    };
    option.include = [{
      model: app.model.models.goods
    }];
    if (name) {
      option.include[0].where = {
        name: {
          [Op.like]: `%${name}%`
        }
      };
    }
    return await app.model[model].grid(option);
  }

  async createdSms(body = {}) {
    const {
      goodsIds,
      model,
      ...createdData
    } = body;
    const {
      app
    } = this;
    let data = goodsIds.map(item => {
      return {
        ...createdData,
        goodsId: item
      };
    });
    return await app.model[model].bulkCreate(data, {});
  }

  async updateSms(body = {}) {
    const {
      id,
      model = 'HomeNewGoods',
      ...updateData
    } = body;
    return await this.app.model[model].update(updateData, {
      where: {
        id
      }
    });
  }

  async delSms({
    id,
    model = 'HomeNewGoods'
  }) {
    return await this.app.model[model].deleteOne({
      where: {
        id
      }
    });
  }

  async getAdvList({
    page,
    size,
    name,
    sort_type,
    sort_by,
    status,
    type
  }) {
    const {
      app
    } = this;
    if (status) {
      var where = {
        status,
        type
      };
    }
    let option = {
      pagination: {
        page,
        size,
        name
      },
      where,
      sort: [ sort_by, sort_type ]
    };
    return await app.model.HomeAdvertise.grid(option);
  }

  async createdAndUpdateAdv(body = {}) {
    const {
      id,
      ...data
    } = body;
    const {
      app
    } = this;
    return id ? await app.model.HomeAdvertise.update({
      ...data
    }, {
      where: {
        id
      }
    }) : await app.model.HomeAdvertise.createOne({
      ...data
    });
  }

  async getAdvInfo({
    id
  }) {
    return await this.app.model.HomeAdvertise.findByPk(id);
  }

  async delAdv({
    id
  } = {}) {
    return this.app.model.HomeAdvertise.deleteOne({
      where: {
        id: id.split(',')
      }
    });
  }
}

module.exports = SmsHome;
