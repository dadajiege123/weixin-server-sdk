//小程序登录 api
import { WeixinSDKErr } from "../Error.js";
export default class WXMP_login {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
     * @param js_code 登录时获取的 code
     */
    async code2Session(js_code) {
        let params = {
            appid: this.weixinSDK.config.WXMP_APPID,
            secret: this.weixinSDK.config.WXMP_APPSECRET,
            js_code,
            grant_type: "authorization_code"
        };
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${params.appid}&secret=${params.secret}&js_code=${params.js_code}&grant_type=${params.grant_type}`;
        const response = await fetch(url);
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            let data = await response.json();
            if (data.errcode && data.errmsg) {
                if (data.errcode === 0) {
                    return data;
                }
                else {
                    throw new WeixinSDKErr({ code: data.errcode, message: data.errmsg });
                }
            }
            else {
                return data;
            }
        }
        else {
            throw new WeixinSDKErr({ code: 500, message: "微信服务器返回数据格式错误" });
        }
    }
}
//# sourceMappingURL=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%99%BB%E5%BD%95.js.map