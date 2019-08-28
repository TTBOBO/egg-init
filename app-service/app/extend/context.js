'use strict';

module.exports = {
  SUCCESS_CODE: 0,
  ERR_CODE: -1,
  getCookie(key = 'token') {
    return this.cookies.get(key, { signed: false });
  },
  removecookies() {
    this.cookies.set('token', null);
  },
  setToken(data = {}) {
    const { app } = this;
    let { uuid, name, userName, userType } = data;
    const token = app.jwt.sign(
      { uuid, name, userName, userType },
      app.config.jwt.secret,
      { expiresIn: '12h' }
    );
    const cookiesConfig = {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: false,
      overwrite: true,
      signed: false
    };
    if (decodeURI(name) === name) {
      name = encodeURI(name);
    }
    this.cookies.set('uuid', uuid, cookiesConfig);
    this.cookies.set('name', name, cookiesConfig);
    this.cookies.set('userName', userName, cookiesConfig);
    this.cookies.set('userType', userType, cookiesConfig);
    this.cookies.set('token', token, cookiesConfig);
    this.cookies.set('code', null);
  },
  async verifyToken() {
    const { app } = this;
    const token = this.getCookie();
    return await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, function(err, decoded) {
        if (err) {
          resolve({ verify: false, message: err.message });
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });
  }
};
