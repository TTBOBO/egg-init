'use strict';
const BaseController = require('./base_controller');
const modelConfig = {
  1: 'HomeNewGoods',
  2: 'HomeRecommendGoods',
  3: 'HomeNewRecommendSubject'
};
class SmsHome extends BaseController {
  async getSmsList() {
    const {
      type
    } = this.ctx.query;
    let result = await this.service.smsHome.getSmsList({
      model: modelConfig[type],
      ...this.ctx.query
    });
    this.success({
      result
    });
  }

  async createdSms() {
    const {
      ctx
    } = this;
    ctx.validate({
      goodsIds: {
        type: 'array'
      },
      type: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.smsHome.createdSms({
        model: modelConfig[ctx.request.body.type],
        ...ctx.request.body
      })
    });
  }

  async updateSms() {
    const {
      ctx
    } = this;
    ctx.validate({
      recommend_status: {
        type: 'number?'
      },
      sort: {
        type: 'number?'
      },
      id: {
        type: 'number'
      },
      type: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.smsHome.updateSms({
        model: modelConfig[ctx.request.body.type],
        ...ctx.request.body
      })
    });
  }

  async delSms() {
    const {
      ctx
    } = this;
    ctx.validate({
      id: {
        type: 'number'
      },
      type: {
        type: 'string'
      }
    });
    this.success({
      model: modelConfig[ctx.request.body.type],
      result: await this.ctx.service.smsHome.delSms(ctx.request.body)
    });
  }

  async getAdvList() {
    let result = await this.service.smsHome.getAdvList({
      ...this.ctx.query
    });
    this.success({
      result
    });
  }
  async createdAndUpdateAdv() {
    const {
      ctx
    } = this;
    ctx.validate({
      name: {
        type: 'string?'
      },
      type: {
        type: 'number?'
      },
      pic: {
        type: 'string?'
      },
      start_date: {
        type: 'datetime?'
      },
      end_date: {
        type: 'datetime?'
      },
      url: {
        type: 'string?'
      },
      status: {
        type: 'number?'
      },
      sort: {
        type: 'number?'
      },
      id: {
        type: 'number?'
      }
    });
    this.success({
      result: await this.ctx.service.smsHome.createdAndUpdateAdv({
        ...ctx.request.body
      })
    });
  }

  async getAdvInfo() {
    let result = await this.service.smsHome.getAdvInfo({
      ...this.ctx.query
    });
    this.success({
      result
    });
  }

  async delAdv() {
    const {
      ctx
    } = this;
    ctx.validate({
      id: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.smsHome.delAdv(ctx.request.body)
    });
  }
}
module.exports = SmsHome;
