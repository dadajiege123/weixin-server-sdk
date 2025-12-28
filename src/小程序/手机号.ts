import { WeixinSDKErr } from "../Error.js";
import type WeixinSDK from "../index.js";


export default class PhoneNumber {
    private weixinSDK:WeixinSDK
    constructor(weixinSDK:WeixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 用于将code换取用户手机号。 说明，每个code只能使用一次，code的有效期为5min
     */
    public async getPhoneNumber(code: string) {

        const params = {
            access_token: await this.weixinSDK.公共方法.调用凭证.getStableAccessToken(),
        }
        const body = {
            code: code,
        }

        const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${params.access_token}`

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        })

        const data = await response.json() as {
            phone_info: {
                phoneNumber: string, //用户绑定的手机号（国外手机号会有区号）
                purePhoneNumber: string, //没有区号的手机号
                countryCode: string, //区号
                watermark: {
                    timestamp: number, //水印时间戳
                    appid: string //小程序appid
                } //数据水印
            },
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