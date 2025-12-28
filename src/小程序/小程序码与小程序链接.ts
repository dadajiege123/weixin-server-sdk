import { WeixinSDKErr } from "../Error.js";
import type { WeixinSDK } from "../index.js";

export default class WXMP_QRCodeAndURL {
    private weixinSDK: WeixinSDK;
    constructor(weixinSDK: WeixinSDK) {
        this.weixinSDK = weixinSDK;
    }

    /**
     * 获取小程序码（永久有效, 数量限制）
     * @param options 
     * @returns 
     */
    public async getQRCode(options: {
        path: string,
        width?: number,
        auto_color?: boolean,
        line_color?: { r: number, g: number, b: number }
        is_hyaline?: boolean,
        env_version?: string
    }) {
        let access_token = await this.weixinSDK.公共方法.调用凭证.getStableAccessToken()

        const params = {
            access_token,
        }
        const body = options;

        const url = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${params.access_token}`

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        })

        const contentType = response.headers.get('content-type');

        if (contentType && contentType === 'image/jpeg') {
            const buffer = await response.arrayBuffer();
            return buffer;

        } else {
            const data = await response.json() as { errcode: number, errmsg: string }
            throw new WeixinSDKErr(`code:${data.errcode}, msg: ${data.errmsg}`);
        }

    }

    /**
     * 获取小程序码（永久有效, 数量不限制）
     * @param options 
     * @returns 
     */
    public async getUnlimitedQRCode(options: {
        scene: string,
        page?: string,
        check_path?: boolean,
        env_version?: string,
        width?: number,
        auto_color?: boolean,
        line_color?: { r: number, g: number, b: number }
        is_hyaline?: boolean
    }) {
        let access_token = await this.weixinSDK.公共方法.调用凭证.getStableAccessToken()

        const params = {
            access_token,
        }
        const body = options;

        const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${params.access_token}`

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        })

        const contentType = response.headers.get('content-type');

        if (contentType && contentType === 'image/jpeg') {
            const buffer = await response.arrayBuffer();
            return buffer;

        } else {
            const data = await response.json() as { errcode: number, errmsg: string }
            throw new WeixinSDKErr(`code:${data.errcode}, msg: ${data.errmsg}`);
        }

    }

    /**
    * 获取小程序二维码（永久有效, 数量限制）
    * @param options 
    * @returns 
    */
    public async createQRCode(options: {
        path: string,
        width?: number,
    }) {
        let access_token = await this.weixinSDK.公共方法.调用凭证.getStableAccessToken()
        
        const params = {
            access_token,
        }
        const body = options;

        const url = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${params.access_token}`

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
        })

        const contentType = response.headers.get('content-type');

        if (contentType && contentType === 'image/jpeg') {
            const buffer = await response.arrayBuffer();
            return buffer;

        } else {
            const data = await response.json() as { errcode: number, errmsg: string }
            throw new WeixinSDKErr(`code:${data.errcode}, msg: ${data.errmsg}`);
        }

    }


}

