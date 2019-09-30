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
  createdToken({ data, hour = 12 }) {
    const { app } = this;
    return app.jwt.sign(data, app.config.jwt.secret, {
      expiresIn: 60 * 60 * hour
    });
  },
  setCookie(key, data) {
    const cookiesConfig = {
      maxAge: 1000 * 3600 * 24 * 7,
      httpOnly: false,
      overwrite: true,
      signed: false
    };
    this.cookies.set(key, data, cookiesConfig);
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
  async getTokenKey(key) {
    let { verify, message } = await this.verifyToken(this.request.header.token);
    return verify ? message[key] : '';
  },
  async verifyToken(tokenStr) {
    const { app } = this;
    const token = tokenStr || this.getCookie();
    return await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, function(err, decoded) {
        if (err) {
          resolve({ verify: false, message: err.message });
        } else {
          resolve({ verify: true, message: decoded });
        }
      });
    });
  },
  async getTreeData({ data, label, value }) {
    let DataArr = [];
    let obj = {};
    data.forEach(async item => {
      obj = { value: item[value], label: item[label] };
      if (item.child && item.child.length) {
        obj.children = await this.getTreeData({
          data: item.child,
          label,
          value
        });
      }
      DataArr.push(obj);
    });
    return DataArr;
  }
};
