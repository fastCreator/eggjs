'use strict';
const createRule = {
  username: {
    type: 'email',
  },
  password: {
    type: 'password',
    compare: 're-password',
  },
};

const Controller = require('egg').Controller;

class File extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async new() {
    this.ctx.validate(createRule);
    this.ctx.body = 'hi, egg new';
  }
  async create() {
    const userInfo = await this.ctx.service.file.upload();
    this.ctx.body = userInfo;
  }
}

module.exports = File;
