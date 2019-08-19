'use strict';

module.exports = () => {
  return async function dataHandler(ctx, next) {
    let transaction;
    try {
      await next();
      transaction = await ctx.app.getTransaction();
      if (transaction) {
        transaction.commit();
        ctx.app.deleteTransaction();
      }
    } catch (err) {
      ctx.app.emit('error', err, ctx);
      // 返回错误信息
      console.log(err);
      const { message, field } = err.errors ? err.errors[0] : err;
      ctx.body = {
        code: ctx.ERR_CODE,
        message: (err.status === 422 ? field + ' ' : '') + message // 422的时候代表egg-validate 验证失败
      };

      // 如果有事物回滚
      if (transaction) {
        transaction.rollback();
        ctx.app.deleteTransaction();
      }
    }
  };
};
