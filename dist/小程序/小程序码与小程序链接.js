import { WeixinSDKErr } from "../Error.js";
export default class WXMP_QRCodeAndURL {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 获取小程序码（永久有效, 数量限制）
     * @param options
     * @returns
     */
    async getQRCode(options) {
        let access_token = await this.weixinSDK.公共方法.调用凭证.getStableAccessToken();
        const params = {
            access_token,
        };
        const body = options;
        const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${params.access_token}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get('content-type');
        if (contentType && contentType === 'image/jpeg') {
            const buffer = await response.arrayBuffer();
            return buffer;
        }
        else if (contentType && contentType === 'application/json') {
            const data = await response.json();
            throw new WeixinSDKErr({ code: data.errcode, message: data.errmsg });
        }
        else {
            throw new WeixinSDKErr({ code: 500, message: "微信服务器返回数据格式错误" });
        }
    }
    /**
     * 获取小程序码（永久有效, 数量不限制）
     * @param options
     * @returns
     */
    async getUnlimitedQRCode(options) {
        let access_token = await this.weixinSDK.公共方法.调用凭证.getStableAccessToken();
        const params = {
            access_token,
        };
        const body = options;
        const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${params.access_token}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get('content-type');
        if (contentType && contentType === 'image/jpeg') {
            const buffer = await response.arrayBuffer();
            return buffer;
        }
        else if (contentType && contentType === 'application/json') {
            const data = await response.json();
            throw new WeixinSDKErr({ code: data.errcode, message: data.errmsg });
        }
        else {
            throw new WeixinSDKErr({ code: 500, message: "微信服务器返回数据格式错误" });
        }
    }
    /**
    * 获取小程序二维码（永久有效, 数量限制）
    * @param options
    * @returns
    */
    async createQRCode(options) {
        let access_token = await this.weixinSDK.公共方法.调用凭证.getStableAccessToken();
        const params = {
            access_token,
        };
        const body = options;
        const url = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${params.access_token}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        });
        const contentType = response.headers.get('content-type');
        if (contentType && contentType === 'image/jpeg') {
            const buffer = await response.arrayBuffer();
            return buffer;
        }
        else if (contentType && contentType === 'application/json') {
            const data = await response.json();
            throw new WeixinSDKErr({ code: data.errcode, message: data.errmsg });
        }
        else {
            throw new WeixinSDKErr({ code: 500, message: "微信服务器返回数据格式错误" });
        }
    }
}
//# sourceMappingURL=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%A0%81%E4%B8%8E%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%93%BE%E6%8E%A5.js.map