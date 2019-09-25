'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return {
    schema: {
      goods_attribute_id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: STRING(64),
        comment: '名称'
      },
      select_type: {
        type: INTEGER,
        comment:
          '属性选择类型：0->唯一；1->单选；2->多选；对应属性和参数意义不同；'
      },
      input_type: {
        type: INTEGER,
        comment: '属性录入方式：0->手工录入；1->从列表中选取'
      },
      input_list: {
        type: STRING(255),
        comment: '可选值列表，以逗号隔开'
      },
      sort: {
        type: INTEGER,
        comment: '排序字段：最高的可以单独上传图片'
      },
      filter_type: {
        type: INTEGER,
        comment: '分类筛选样式：1->普通；1->颜色'
      },
      search_type: {
        type: INTEGER,
        comment: '检索类型；0->不需要进行检索；1->关键字检索；2->范围检索'
      },
      related_status: {
        type: INTEGER,
        comment: '相同属性产品是否关联；0->不关联；1->关联'
      },
      hand_add_status: {
        type: INTEGER,
        comment: '是否支持手动新增；0->不支持；1->支持'
      },
      type: {
        type: INTEGER,
        comment: '属性的类型；0->规格；1->参数'
      },
      attributeCount: {
        type: INTEGER,
        comment: '属性数量'
      },
      paramCount: {
        type: INTEGER,
        comment: '参数数量'
      }
    },
    options: {
      comment: '商品属性表' // comment for table
    }
  };
};
