'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const SecretId = 'AKIDtkSzMX3lcLzY1KwWZSAg1BOWTFpGnhse'; // 替换为用户的 SecretId
const SecretKey = 'oUzJSPEuPiplhYGpETXQ7cw41IdqrhXj'; // 替换为用户的 SecretKey
const Bucket = 'vedio-1256295002'; // 替换为用户操作的 Bucket
const Region = 'ap-chengdu'; // 替换为用户操作的 Region

const COS = require('cos-nodejs-sdk-v5');
const cos = new COS({ SecretId, SecretKey });
const exec = (cmd, params) => {
  return new Promise((resolve, reject) => {
    cos[cmd](Object.assign({ Bucket, Region }, params), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

class FileService extends Service {
  async upload() {
    const file = this.ctx.request.files[0];
    const filePath = file.filepath;
    const temp = file.filename.split('.');
    const fileType = temp[temp.length - 1];
    const lastName = '.' + fileType;
    const fileName = Date.now() + lastName;
    let result;
    try {
      // 处理文件，比如上传到云端
      const key = fileName;
      result = await exec('sliceUploadFile', {
        Key: key,
        FilePath: filePath,
      });
    } finally {
      // 需要删除临时文件
      await fs.unlink(filePath);
    }
    return result;
  }
}
module.exports = FileService;
