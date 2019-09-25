'use strict';
const baseController = require('./base_controller');
class Goods extends baseController {
  async goodsList() {
    let result = await this.service.goods.goodsList(this.ctx.query);
    this.success({
      result
    });
  }
  async addGoods() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string' },
      status: { type: 'string' },
      salePrice: { type: 'string' },
      categoryId: { type: 'number' },
      goodsInfo: { type: 'string?' }
    });
    this.success({
      result: await this.ctx.service.goods.addGoods({
        ...ctx.request.body
      })
    });
  }

  async updateGoods() {
    const { ctx } = this;
    ctx.validate({
      name: { type: 'string' },
      status: { type: 'string' },
      salePrice: { type: 'string' },
      categoryId: { type: 'number' },
      goodsInfo: { type: 'string?' },
      goodsId: { type: 'string' }
    });
    this.success({
      result: await this.ctx.service.goods.updateGoods(ctx.request.body)
    });
  }

  async changeGoodsStatus() {
    const { ctx } = this;
    ctx.validate({
      ids: { type: 'array' },
      status: { type: 'string' }
    });
    this.success({
      result: await this.ctx.service.goods.changeGoodsStatus({
        ...ctx.request.body
      })
    });
  }

  async categoryList() {
    const query = this.ctx.query;
    let result = await this.service.goods.categoryList(query, query.hasGoods);
    this.success({
      result
    });
  }
  async addCategory() {
    const { ctx } = this;
    ctx.validate({
      categoryName: { type: 'string' },
      categoryDes: { type: 'string?' },
      parentId: { type: 'string?' },
      level: { type: 'number' },
      productCount: { type: 'number' },
      productUnit: { type: 'string' },
      showStatus: { type: 'number' },
      keywords: { type: { type: 'string?' } }
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
