import type WeixinSDK from "../index.js";
import WXMP_login from "./小程序登录.js";
import WXMP_QRCodeAndURL from "./小程序码与小程序链接.js";
import PhoneNumber from "./手机号.js";
export default class WXMP {
    小程序登录: WXMP_login;
    手机号: PhoneNumber;
    小程序码与小程序链接: WXMP_QRCodeAndURL;
    constructor(weixinSDK: WeixinSDK);
}
//# sourceMappingURL=WXMP.d.ts.map