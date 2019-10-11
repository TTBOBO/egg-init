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
    const {
      ctx
    } = this;
    ctx.validate({
      name: {
        type: 'string'
      },
      status: {
        type: 'enum',
        values: [ 'down', 'up' ]
      },
      salePrice: {
        type: 'string'
      },
      categoryId: {
        type: 'number'
      },
      goodsInfo: {
        type: 'string'
      },
      subTitle: {
        type: 'string'
      },
      originalPrice: {
        type: 'string'
      },
      stock: {
        type: 'number'
      },
      weight: {
        type: 'string?'
      },
      detailTitle: {
        type: 'string'
      },
      serviceIds: {
        type: 'string'
      },
      promotionType: {
        type: 'number'
      },
      goods_attribute_category_id: {
        type: 'number'
      },
      skuStockList: {
        type: 'array',
        min: 1
      },
      goodsAttributeValueList: {
        type: 'array?',
        min: 1
      },
      memberPrice: {
        type: 'object'
      },
      goodsLadderList: {
        type: 'array?',
        min: 1
      },
      goodsFullReductionList: {
        type: 'array?',
        min: 1
      },
      album_pics: {
        type: 'string'
      },
      newStatus: {
        type: 'enum',
        values: [ '1', '0' ]
      },
      recommandStatus: {
        type: 'enum',
        values: [ '1', '0' ]
      },
      goodsId: {
        type: 'string?'
      }
    });
    this.success({
      result: await this.ctx.service.goods.addUpdateGoods({
        ...ctx.request.body
      })
    });
  }

  async deleteGoods() {
    const {
      ctx
    } = this;
    ctx.validate({
      goodsId: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.goods.deleteGoods(ctx.request.body)
    });
  }

  async updateGoodsInfo() {
    const {
      ctx
    } = this;
    ctx.validate({
      goodsId: {
        type: 'string'
      }
    }, ctx.request.query);
    this.success({
      result: await this.ctx.service.goods.updateGoodsInfo(ctx.request.query)
    });
  }


  async changeGoodsStatus() {
    const {
      ctx
    } = this;
    ctx.validate({
      ids: {
        type: 'array'
      },
      status: {
        type: 'string?'
      },
      newStatus: {
        type: 'string?'
      },
      recommandStatus: {
        type: 'string?'
      },
      verifyStatus: {
        type: 'string?'
      }
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

  async getCategoryTree() {
    const query = this.ctx.query;
    let data = await this.service.goods.getCategoryTree(query);
    this.success({
      result: {
        data
      }
    });
  }

  async addCategory() {
    const {
      ctx
    } = this;
    ctx.validate({
      categoryName: {
        type: 'string'
      },
      categoryDes: {
        type: 'string?'
      },
      parentId: {
        type: 'number?'
      },
      level: {
        type: 'number'
      },
      productCount: {
        type: 'number'
      },
      productUnit: {
        type: 'string'
      },
      showStatus: {
        type: 'string'
      },
      keywords: {
        type: 'string?'
      }
    });
    this.success({
      result: await this.ctx.service.goods.addCategory({
        ...ctx.request.body
      })
    });
  }
  async deleteCategory() {
    const {
      ctx
    } = this;
    this.success({
      result: await this.ctx.service.goods.deleteCategory(ctx.request.body)
    });
  }

  async updateCateGory() {
    const {
      ctx
    } = this;
    ctx.validate({
      categoryName: {
        type: 'string'
      },
      categoryDes: {
        type: 'string?'
      },
      id: {
        type: 'number'
      }
    });
    this.success({
      result: await this.ctx.service.goods.updateCateGory(ctx.request.body)
    });
  }
  async goodsAttributeCategoryList() {
    const query = this.ctx.query;
    let result = await this.service.goods.goodsAttributeCategoryList(query);
    this.success({
      result
    });
  }

  async addGoodsAttributeCategory() {
    const {
      ctx
    } = this;
    ctx.validate({
      name: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.goods.addGoodsAttributeCategory(
        ctx.request.body
      )
    });
  }

  async updateGoodsAttributeCategory() {
    const {
      ctx
    } = this;
    ctx.validate({
      goods_attribute_category_id: {
        type: 'number'
      },
      name: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.goods.updateGoodsAttributeCategory(
        ctx.request.body
      )
    });
  }

  async deleteGoodsAttributeCategory() {
    const {
      ctx
    } = this;
    this.success({
      result: await this.ctx.service.goods.deleteGoodsAttributeCategory(
        ctx.request.body
      )
    });
  }

  async GoodsAttributeList() {
    const query = this.ctx.query;
    let result = await this.service.goods.GoodsAttributeList(query);
    this.success({
      result
    });
  }
  async GoodsAttributeInfo() {
    const query = this.ctx.query;
    let result = await this.service.goods.GoodsAttributeInfo(query);
    this.success({
      result
    });
  }

  async addUpdateGoodsAttribute() {
    const {
      ctx
    } = this;
    ctx.validate({
      goods_attribute_id: {
        type: 'number?'
      },
      name: {
        type: 'string'
      },
      goods_attribute_category_id: {
        type: 'number'
      },
      select_type: {
        type: 'number'
      },
      input_type: {
        type: 'number'
      },
      sort: {
        type: 'number'
      },
      filter_type: {
        type: 'number'
      },
      search_type: {
        type: 'number'
      },
      related_status: {
        type: 'number'
      },
      hand_add_status: {
        type: 'number'
      },
      type: {
        type: 'number'
      }
    });
    this.success({
      result: await this.ctx.service.goods.addUpdateGoodsAttribute({
        ...ctx.request.body
      })
    });
  }

  async deleteGoodsAttribute() {
    const {
      ctx
    } = this;
    ctx.validate({
      goods_attribute_id: {
        type: 'string'
      },
      type: {
        type: 'string'
      },
      goods_attribute_category_id: {
        type: 'string'
      }
    },
    ctx.request.query
    );
    this.success({
      result: await this.ctx.service.goods.deleteGoodsAttribute({
        ...ctx.request.query
      })
    });
  }

  async getSkuList() {
    const {
      ctx
    } = this;
    ctx.validate({
      goodsId: {
        type: 'string'
      }
    },
    ctx.request.query
    );
    this.success({
      result: await this.ctx.service.goods.getSkuList({
        ...ctx.request.query
      })
    });
  }

  async changeSku() {
    const {
      ctx
    } = this;
    ctx.validate({
      data: {
        type: 'array',
        min: 1
      },
      goodsId: {
        type: 'string'
      }
    });
    this.success({
      result: await this.ctx.service.goods.changeSku({
        ...ctx.request.body
      })
    });
  }
}
module.exports = Goods;
