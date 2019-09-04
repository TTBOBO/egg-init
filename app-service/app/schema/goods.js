'use strict';
module.exports = app => {
  const { STRING, DATE, UUIDV1, ENUM, TEXT, DECIMAL } = app.Sequelize;
  return {
    schema: {
      goodsId: {
        type: STRING(38),
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV1
      },
      createdTime: {
        type: DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      name: STRING(76),
      status: {
        type: ENUM('up', 'down'),
        comment: 'up 上架、down 下架'
      },
      goodsInfo: TEXT,
      salePrice: DECIMAL,
      thumbnail: STRING(255)
    },
    option: {
      comment: '商品表'
    }
  };
};
