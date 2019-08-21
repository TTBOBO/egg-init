'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    const noAuth = [
      '/user/login',
      '/user/register',
      '/user/login_out',
      '/user/get_code_img',
      '/upload',
      '/public',
      '/exec',
      '/user/get_user_list'
    ];
    const { verify, message } = await ctx.verifyToken();
    verify || noAuth.indexOf(ctx.path) !== -1 ? await next() : await next();
    // (ctx.body = {
    //   code: 403,
    //   data: '',
    //   message
    // });
  };
};
