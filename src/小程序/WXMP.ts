import type WeixinSDK from "../index.js";
import WXMP_login from "./小程序登录.js";
import WXMP_QRCodeAndURL from "./小程序码与小程序链接.js";
import PhoneNumber from "./手机号.js";

export default class WXMP {
  public 小程序登录: WXMP_login
  public 手机号: PhoneNumber
  public 小程序码与小程序链接: WXMP_QRCodeAndURL
  constructor(weixinSDK: WeixinSDK) {
    this.小程序登录 = new WXMP_login(weixinSDK);
    this.手机号 = new PhoneNumber(weixinSDK);
    this.小程序码与小程序链接 = new WXMP_QRCodeAndURL(weixinSDK);
  }


}
