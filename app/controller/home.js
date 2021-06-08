'use strict';

const { ms } = require('tencentcloud-sdk-nodejs');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async chat() {
    const { ctx } = this;
    const question = ctx.request.query.msg;
    // const tencentcloud = require("../../../../tencentcloud-sdk-nodejs");
    const tencentcloud = require('tencentcloud-sdk-nodejs');
    const NlpClient = tencentcloud.nlp.v20190408.Client;
    const models = tencentcloud.nlp.v20190408.Models;
    const Credential = tencentcloud.common.Credential;
    const ClientProfile = tencentcloud.common.ClientProfile;
    const HttpProfile = tencentcloud.common.HttpProfile;
    const cred = new Credential('AKIDXv8D82BcAaps4BErPj37wWooYZbNAKOu', 'rnXGwzpWL2lNwJvSpEVZQH3qRlCPWO2T');
    const httpProfile = new HttpProfile();
    httpProfile.endpoint = 'nlp.tencentcloudapi.com';
    const clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    const client = new NlpClient(cred, 'ap-guangzhou', clientProfile);
    const req = new models.ChatBotRequest();
    // let params = '{\"Query\":\"你好\"}'
    const params = JSON.stringify({ Query: question });
    req.from_json_string(params);
    const data = await new Promise(function(reslove, reject) {
      client.ChatBot(req, function(errMsg, response) {
        if (errMsg) {
          console.log(errMsg);
          return;
        }
        console.log(response.to_json_string());
        reslove(response);
      });
    });
    ctx.body = data;
  }
  async translation() {
    // const tencentcloud = require("../../../../tencentcloud-sdk-nodejs");
    const { ctx } = this;
    const tencentcloud = require('tencentcloud-sdk-nodejs');
    const msg = ctx.request.query.msg;
    let target;
    console.log(msg);
    if (/.*[\u4e00-\u9fa5]+.*$/.test(msg)) {
      // alert("不能含有汉字！");
      // return false;
      target = 'en';
    } else {
      target = 'zh';
    }
    // let target;
    // let re = /[^\u4E00-\u9FA5]/;
    // if (re.test(msg)) {
    //   target = "en";
    // } else {
    //   target = "zh";
    // }
    console.log(target);
    const TmtClient = tencentcloud.tmt.v20180321.Client;
    const models = tencentcloud.tmt.v20180321.Models;
    const Credential = tencentcloud.common.Credential;
    const ClientProfile = tencentcloud.common.ClientProfile;
    const HttpProfile = tencentcloud.common.HttpProfile;
    const cred = new Credential('AKIDXv8D82BcAaps4BErPj37wWooYZbNAKOu', 'rnXGwzpWL2lNwJvSpEVZQH3qRlCPWO2T');
    const httpProfile = new HttpProfile();
    httpProfile.endpoint = 'tmt.tencentcloudapi.com';
    const clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    const client = new TmtClient(cred, 'ap-guangzhou', clientProfile);
    const req = new models.TextTranslateRequest();
    const params = '{\"SourceText\":\"我给我简单拥想抬头暖阳春草,你抱\",\"Source\":\"auto\",\"Target\":\"en\",\"ProjectId\":0}';
    // const params = JSON.stringify({
    //   SourceText: msg,
    //   Source: 'auto',
    //   Target: target,
    //   ProjectId: 0,
    // });
    req.from_json_string(params);

    const data = await new Promise(function(reslove, reject) {
      client.TextTranslate(req, function(errMsg, response) {
        if (errMsg) {
          console.log(errMsg);
          return;
        }
        console.log(response.to_json_string());
        reslove(response);
      });
    });
    ctx.body = data;
  }
  async char() {

    const { ctx } = this;
    // console.log(ctx.request.body.image);
    // ctx.body="hello";
    const ImageBase64 = ctx.request.body.image;
    const tencentcloud = require('tencentcloud-sdk-nodejs');
    const OcrClient = tencentcloud.ocr.v20181119.Client;
    const models = tencentcloud.ocr.v20181119.Models;
    const Credential = tencentcloud.common.Credential;
    const ClientProfile = tencentcloud.common.ClientProfile;
    const HttpProfile = tencentcloud.common.HttpProfile;
    const cred = new Credential('AKIDtjRM1PvbS5YktpHKp1way7zZtw98lX4S', 'M891dx0mcUCoENFqLZWDfqlCMTQ7Xefa');
    const httpProfile = new HttpProfile();
    httpProfile.endpoint = 'ocr.tencentcloudapi.com';
    const clientProfile = new ClientProfile();
    clientProfile.httpProfile = httpProfile;
    const client = new OcrClient(cred, 'ap-guangzhou', clientProfile);
    const req = new models.GeneralBasicOCRRequest();
    const params = JSON.stringify({
      ImageBase64,
    });
    req.from_json_string(params);
    const data = await new Promise(function(reslove, reject) {
      client.GeneralBasicOCR(req, function(errMsg, response) {

        if (errMsg) {
          console.log(errMsg);
          return;
        }

        console.log(response.to_json_string());
        reslove(response);
      });
    });
    ctx.body = data;

  }

}

module.exports = HomeController;
