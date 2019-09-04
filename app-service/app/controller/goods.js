'use strict';
const baseController = require('./base_controller');
class Goods extends baseController {
  async goodsList() {
    let result = await this.service.goods.goodsList(this.ctx.query);
    this.success({
      result
    });
  }
  async categoryList() {
    let result = await this.service.goods.categoryList(this.ctx.query);
    this.success({
      result
    });
  }
  async addCategory() {
    const { ctx } = this;
    ctx.validate({
      categoryName: { type: 'string' },
      categoryDes: { type: 'string?' }
    });
    this.success({
      result: await this.ctx.service.goods.addCategory({
        ...ctx.request.body
      })
    });
  }
  async deleteCategory() {
    const { ctx } = this;
    this.success({
      result: await this.ctx.service.goods.deleteCategory(ctx.request.body)
    });
  }

  async updateCateGory() {
    const { ctx } = this;
    ctx.validate({
      categoryName: { type: 'string' },
      categoryDes: { type: 'string?' },
      id: { type: 'number' }
    });
    this.success({
      result: await this.ctx.service.goods.updateCateGory(ctx.request.body)
    });
  }
}
module.exports = Goods;
