import { WeixinSDKErr } from "../Error.js";
export default class PhoneNumber {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 用于将code换取用户手机号。 说明，每个code只能使用一次，code的有效期为5min
     */
    async getPhoneNumber(code) {
        const params = {
            access_token: await this.weixinSDK.公共方法.调用凭证.getStableAccessToken(),
        };
        const body = {
            code: code,
        };
        const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${params.access_token}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
        const data = await response.json();
        if (data.errcode === 0) {
            return data;
        }
        else {
            throw new WeixinSDKErr({ code: data.errcode, message: data.errmsg });
        }
    }
}
//# sourceMappingURL=%E6%89%8B%E6%9C%BA%E5%8F%B7.js.map