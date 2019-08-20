'use strict';
const CosController = require('./cos');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const awaitStreamReady = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;
class BaseController extends Controller {
  async getCode() {
    const svgCaptcha = require('svg-captcha');
    var codeConfig = {
      size: 5,
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      noise: 2, // 干扰线条的数量
      height: 44
    };
    var captcha = svgCaptcha.create(codeConfig);
    this.ctx.cookies.set('code', captcha.text.toLowerCase()); // 存session用于验证接口获取文字码
    var codeData = {
      img: captcha.data
    };
    this.ctx.body = codeData;
  }
  async upload() {
    const {
      ctx,
      config: { baseDir, uplaodBasePath, openCos }
    } = this;
    const stream = await ctx.getFileStream();
    const {
      fields: { name }
    } = stream;
    // 生成文件名
    const filename =
      name ||
      `${Date.now()}${Number.parseInt(Math.random() * 10000)}${path.extname(
        stream.filename
      )}`;
    // 生成文件夹
    const dirName = moment(new Date()).format('YYYY_MM_DD');
    // 生成写入路径
    const saveDirName = path.join(baseDir, uplaodBasePath, dirName);
    if (!fs.existsSync(saveDirName)) {
      fs.mkdirSync(saveDirName);
    }
    // const FilePath = path.join(
    //   this.config.baseDir,
    //   uplaodBasePath,
    //   dirName,
    //   filename
    // );
    return await new Promise(async resolve => {
      try {
        // 写入文件
        // const writeStream = fs.createWriteStream(FilePath);
        // await awaitStreamReady(stream.pipe(writeStream));
        if (openCos) {
          const Cos = new CosController(this.config.cos);
          // let data = await Cos.putObject({ Key: filename, FilePath });
          let data = await Cos.putObject({ Key: filename, Body: stream });
          // fs.unlinkSync(FilePath);
          resolve(data.Location);
        } else {
          resolve(`${ctx.request.host}/public/upload/${dirName}/${filename}`);
        }
      } catch (err) {
        // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
        await sendToWormhole(stream);
        throw err;
      }
    });
  }
  async uploadFile() {
    let filePath = await this.upload();
    this.success({ data: filePath });
  }

  verifyCode(code) {
    return code !== this.ctx.cookies.get('code');
  }

  success({ data, status, message = '' }) {
    this.ctx.body = {
      code: this.ctx.SUCCESS_CODE,
      message,
      data
    };
    this.ctx.status = status || 200;
  }

  fail(message, code) {
    this.ctx.body = {
      code: code || this.ctx.ERR_CODE,
      message,
      data: {}
    };
    this.ctx.status = 200;
  }
}
module.exports = BaseController;
