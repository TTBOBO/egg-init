'use strict';
// const fs = require('fs');
var STS = require('./sts');
var Cos = require('cos-nodejs-sdk-v5');
class CosController {
  constructor(config) {
    this.config = config;
    // Bucket, Region, baseUrl
    const { Bucket, Region, baseUrl, ...CosInitConfig } = this.config;
    console.log(Bucket, Region, baseUrl);
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
  async getCredential() {
    const { Bucket, Region, SecretId, SecretKey } = this.config;
    var scope = [
      {
        action: 'name/cos:PutObject',
        bucket: Bucket,
        region: Region,
        prefix: '1.txt'
      }
    ];
    var policy = STS.getPolicy(scope);
    return new Promise((resolve, reject) => {
      STS.getCredential(
        {
          secretId: SecretId,
          secretKey: SecretKey,
          policy,
          durationSeconds: 18000
        },
        function(err, credential) {
          err ? reject(err) : resolve(credential);
        }
      );
    });
  }
}
module.exports = CosController;
