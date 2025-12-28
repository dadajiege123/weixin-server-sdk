import { WeixinSDKErr } from "../Error.js";
export default class CallCredential {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
  * 获取稳定版调用凭据
  * @param force_refresh //是否强制刷新  默认为false
  * @returns
  */
    async getStableAccessToken(force_refresh = false) {
        let body = {
            grant_type: 'client_credential',
            appid: this.weixinSDK.config.WXMP_APPID,
            secret: this.weixinSDK.config.WXMP_APPSECRET,
            force_refresh: force_refresh
        };
        const url = `https://api.weixin.qq.com/cgi-bin/stable_token`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        if (data.errcode === 0) {
            return data;
        }
        else {
            throw new WeixinSDKErr(`code:${data.errcode},msg:${data.errmsg}`);
        }
    }
}
//# sourceMappingURL=%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E5%87%AD%E8%AF%81.js.map