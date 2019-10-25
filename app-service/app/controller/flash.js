'use strict';
const BaseController = require('./base_controller');
const moment = require('moment');
class Flash extends BaseController {
  async getFlashList() {
    const {
      type
    } = this.ctx.query;
    let result = JSON.parse(JSON.stringify(await this.ctx.service.flash.getFlashList({
      ...this.ctx.query,
      model: type ? 'FlashPromotionSession' : 'FlashPromotion'
    })));
    let str = 'YYYY-MM-DD HH:mm:ss';
    this.success({
      result: {
        ...result,
        data: result.data.map(item => {
          return {
            ...item,
            start_date: type ? item.start_date : moment(item.start_date).format(str),
            end_date: type ? item.end_date : moment(item.end_date).format(str)
          };
        })
      }
    });
  }


  async crateFlashPromotion() {
    const {
      ctx
    } = this;
    const {
      type
    } = ctx.request.body;
    ctx.validate({
      name: {
        type: 'string'
      },
      id: {
        type: 'number?'
      },
      start_date: {
        type: 'string?'
      },
      end_date: {
        type: 'string?'
      },
      status: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.flash.crateFlashPromotion({
        ...ctx.request.body,
        model: type ? 'FlashPromotionSession' : 'FlashPromotion'
      })
    });
  }

  async delFlashPromotion() {
    const {
      ctx
    } = this;
    const {
      type
    } = ctx.request.body;
    ctx.validate({
      id: {
        type: 'number'
      }
    });
    this.success({
      result: await this.ctx.service.flash.delFlashPromotion({
        ...ctx.request.body,
        model: type ? 'FlashPromotionSession' : 'FlashPromotion'
      })
    });
  }

  async getFlashPromotionGoodsList() {
    this.success({
      result: await this.ctx.service.flash.getFlashPromotionGoodsList(this.ctx.query)
    });
  }

  async delFlashPromotionGoods() {
    const {
      ctx
    } = this;
    ctx.validate({
      id: {
        type: 'number'
      },
      goodsId: 'string'
    });
    this.success({
      result: await this.ctx.service.flash.delFlashPromotionGoods(ctx.request.body)
    });
  }

  async crateFlashPromotionGoods() {
    const {
      ctx
    } = this;
    ctx.validate({
      sessionId: {
        type: 'number'
      },
      goodsId: {
        type: 'array'
      },
      promotionId: {
        type: 'number'
      }
    });
    this.success({
      result: await this.ctx.service.flash.crateFlashPromotionGoods({
        ...ctx.request.body
      })
    });
  }

  async updateFlashPromotionGoods() {
    const {
      ctx
    } = this;
    ctx.validate({
      flash_promotion_price: {
        type: 'string?'
      },
      flash_promotion_count: {
        type: 'number?'
      },
      flash_promotion_limit: {
        type: 'number?'
      },
      id: {
        type: 'number'
      }
    });
    this.success({
      result: await this.ctx.service.flash.updateFlashPromotionGoods({
        ...ctx.request.body
      })
    });
  }

}
module.exports = Flash;
