'use strict';

const Service = require('egg').Service;
class Flash extends Service {
  async getFlashList({
    page,
    size,
    name,
    sort_type,
    sort_by,
    model = 'FlashPromotion',
    counts,
    promotionId
  }) {
    const {
      app
    } = this;
    const {
      Sequelize: {
        Op
      }
    } = app;
    const sequelize = app.Sequelize;
    if (name) {
      var where = {
        name: {
          [Op.like]: `%${name}%`
        }
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
    if (counts) {

      option.attributes = [
        'id',
        'name',
        'start_date',
        'end_date',
        'createdTime'
      ];

      option.include = [{
        model: app.model.models.flashPromotionGoods,
        as: 'goods',
        where: {
          promotionId
        },
        attributes: [
          [
            sequelize.fn('COUNT', sequelize.col('*')),
            'count'
          ]
        ]
      }];
    }

    return await app.model[model].grid(option);
  }

  async crateFlashPromotion(body = {}) {
    const {
      id,
      model = 'FlashPromotion',
      ...createData
    } = body;
    const {
      app
    } = this;
    return id ? await app.model[model].update({
      ...createData
    }, {
      where: {
        id
      }
    }) : await app.model[model].createOne({
      ...createData
    });
  }

  async delFlashPromotion({
    id,
    model = 'FlashPromotion'
  }) {
    return await this.app.model[model].deleteOne({
      where: {
        id
      }
    });
  }

  async getFlashPromotionGoodsList({
    page,
    size,
    sort_type,
    sort_by,
    promotionId,
    sessionId
  }) {
    const {
      app
    } = this;
    let option = {
      pagination: {
        page,
        size
      },
      sort: [ sort_by, sort_type ],
      include: [{
        model: app.model.models.goods
        // as: 'goods'
      }],
      where: {
        promotionId,
        sessionId
      }
    };
    return await app.model.FlashPromotionGoods.grid(option);
  }

  async delFlashPromotionGoods({
    id,
    goodsId
  }) {
    const transaction = await this.app.getTransaction();
    let delFlash = await this.app.model.FlashPromotionGoods.deleteOne({
      where: {
        id
      }
    });
    let delGoodsTypes = null;
    if (delFlash) {
      delGoodsTypes = await this.app.model.Goods.update({
        promotionType: 0
      }, {
        where: {
          goodsId
        },
        transaction
      });
    }
    return {
      delFlash,
      delGoodsTypes
    };
  }

  async crateFlashPromotionGoods(body = {}) {
    const transaction = await this.app.getTransaction();
    const {
      promotionId,
      sessionId,
      goodsId
    } = body;
    const {
      app
    } = this;
    let createdData = goodsId.map(item => {
      return {
        promotionId,
        sessionId,
        goodsId: item
      };
    });
    let goodsStatusData = goodsId.map(item => {
      return {
        goodsId: item,
        promotionType: 5
      };
    });
    let created = await app.model.FlashPromotionGoods.bulkCreate(createdData, {
      transaction
    });
    let updateGoodsStatus = await app.model.Goods.bulkCreate(goodsStatusData, {
      updateOnDuplicate: [ 'goodsId:', 'promotionType' ],
      transaction
    });
    return {
      created,
      updateGoodsStatus
    };
  }

  async updateFlashPromotionGoods(body = {}) {
    const {
      id,
      ...updateData
    } = body;
    return await this.app.model.FlashPromotionGoods.update(updateData, {
      where: {
        id
      }
    });
  }

}

module.exports = Flash;
