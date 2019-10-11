'use strict';
module.exports = app => {
  const {
    STRING,
    UUIDV1,
    ENUM,
    TEXT,
    DECIMAL,
    INTEGER,
    BIGINT,
    DATE
  } = app.Sequelize;
  return {
    schema: {
      goodsId: {
        type: STRING(38),
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
      },
      name: STRING(76),
      status: {
        type: ENUM('up', 'down'),
        comment: 'up 上架、down 下架'
      },
      goodsInfo: TEXT,
      salePrice: DECIMAL,
      originalPrice: DECIMAL,
      thumbnail: STRING(255),
      album_pics: STRING(255),
      deleteStatus: {
        type: ENUM('0', '1'),
        comment: '0 未删除 1 已删除'
      },
      newStatus: {
        type: ENUM('0', '1'),
        comment: '0 不是新品 1 新品'
      },
      recommandStatus: {
        type: ENUM('0', '1'),
        comment: '0 不推荐 1 推荐'
      },
      verifyStatus: {
        type: ENUM('0', '1', '2'),
        comment: '0 待审核 1 审核通过 2审核失败',
        defaultValue: '0'
      },
      sort: INTEGER.UNSIGNED,
      sale: {
        type: INTEGER.UNSIGNED,
        comment: '销量'
      },

      subTitle: {
        type: STRING(38),
        comment: '副标题'
      },
      stock: {
        type: BIGINT(11),
        comment: '库存'
      },
      low_stock: {
        type: BIGINT(11),
        comment: '库存预警'
      },
      unit: {
        type: STRING(16),
        comment: '单位'
      },
      weight: {
        type: DECIMAL(10, 2),
        comment: '商品重量，默认为克'
      },
      serviceIds: {
        type: STRING(64),
        comment: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮'
      },
      keywords: {
        type: STRING(255),
        comment: '关键词'
      },
      detailTitle: {
        type: STRING(255),
        comment: '详情标题'
      },
      detailDesc: {
        type: TEXT,
        comment: '详情描述'
      },
      detailHtml: {
        type: TEXT,
        comment: '产品详情网页内容'
      },
      detailMobileHtml: {
        type: TEXT,
        comment: '移动端网页详情'
      },
      promotionStartTime: {
        type: DATE,
        comment: '促销开始时间'
      },
      promotionEndTime: {
        type: DATE,
        comment: '促销结束时间'
      },
      promotionPrice: {
        type: INTEGER.UNSIGNED,
        comment: '促销价格'
      },
      promotionType: {
        type: INTEGER,
        comment: '促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购'
      }
    },
    option: {
      comment: '商品表'
    }
  };
};
