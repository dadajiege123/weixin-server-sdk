import type WeixinSDK from "../index.js";
import JSAPI from "./支付产品/JSAPI.js";
import MerchantTransfer from "./运营工具/MerchantTransfer.js";



export default class Pay {
  public JSAPI: JSAPI
  public 运营工具: {
    商家转账: MerchantTransfer
  }
  constructor(weixinSDK: WeixinSDK) {
    this.JSAPI = new JSAPI(weixinSDK);
    this.运营工具 = {
      商家转账: new MerchantTransfer(weixinSDK)
    }
  }


}
