//小程序登录 api

import { WeixinSDKErr } from "../Error.js";
import type WeixinSDK from "../index.js";

export default class WXMP_login {
    private weixinSDK: WeixinSDK;
    constructor(weixinSDK:WeixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
     * @param js_code 登录时获取的 code
     */
    public async code2Session(js_code: string) {
        let params = {
            appid: this.weixinSDK.config.WXMP_APPID,
            secret: this.weixinSDK.config.WXMP_APPSECRET,
            js_code,
            grant_type: "authorization_code"
        }
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${params.appid}&secret=${params.secret}&js_code=${params.js_code}&grant_type=${params.grant_type}`
        const response = await fetch(url)
        let data = await response.json() as {
            session_key: string,
            unionid?: string,
            openid: string,
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