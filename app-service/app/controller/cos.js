'use strict';
const fs = require('fs');
var Cos = require('cos-nodejs-sdk-v5');
class CosController {
  constructor(config) {
    this.config = config;
    const { Bucket, Region, baseUrl, ...CosInitConfig } = this.config;
    this.cos = new Cos({ ...CosInitConfig });
  }
  async sliceUploadFile(params = {}) {
    const { Bucket, Region } = this.config;
    return await new Promise(resolve => {
      this.cos.sliceUploadFile(
        {
          Bucket,
          Region,
          ...params
        },
        (err, data) => {
          err ? resolve() : resolve(data);
        }
      );
    });
  }
  async putObject(params = {}) {
    const { Bucket, Region } = this.config;
    return await new Promise(resolve => {
      this.cos.putObject(
        {
          Bucket,
          Region,
          ...params
        },
        (err, data) => {
          err ? resolve() : resolve(data);
        }
      );
    });
  }
}
module.exports = CosController;
