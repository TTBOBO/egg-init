'use strict';
module.exports = app => {
  const {
    INTEGER,
    DECIMAL
  } = app.Sequelize;
  return {
    schema: {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      flash_promotion_price: {
        type: DECIMAL(10, 2),
        comment: '限时购价格'
      },
      flash_promotion_count: {
        type: INTEGER.UNSIGNED,
        comment: '限时购数量'
      },
      flash_promotion_limit: {
        type: INTEGER.UNSIGNED,
        comment: '每人限购数量'
      }
    },
    options: {
      comment: '限时购表' // comment for table
    }
  };
};
