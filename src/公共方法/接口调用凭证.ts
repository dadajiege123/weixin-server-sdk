import { WeixinSDKErr } from "../Error.js";
import type WeixinSDK from "../index.js";

export default class CallCredential {
    weixinSDK: WeixinSDK
    constructor(weixinSDK: WeixinSDK) {
        this.weixinSDK = weixinSDK;
    }

    /**
  * 获取稳定版调用凭据
  * @param force_refresh //是否强制刷新  默认为false
  * @returns 
  */
    public async getStableAccessToken(force_refresh: boolean = false) {
        let body = {
            grant_type: 'client_credential',
            appid: this.weixinSDK.config.WXMP_APPID,
            secret: this.weixinSDK.config.WXMP_APPSECRET,
            force_refresh: force_refresh
        }
        const url = `https://api.weixin.qq.com/cgi-bin/stable_token`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const data = await response.json() as {
            access_token: string,
            expires_in: number,
            errcode: number,
            errmsg: string
        };
        if (data.errcode === 0) {
            return data;
        } else {
            throw new WeixinSDKErr(`code:${data.errcode},msg:${data.errmsg}`);
        }

    }


}