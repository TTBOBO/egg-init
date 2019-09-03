'use strict';
module.exports = {
  filterNull(obj) {
    var _newPar = {};
    for (var key in obj) {
      // 如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。
      if (
        (obj[key] === 0 || obj[key] === false || obj[key]) &&
        obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
      ) {
        _newPar[key] = obj[key];
      }
    }
    return _newPar;
  }
};
