import type WeixinSDK from "../index.js";
export default class WXMP_login {
    private weixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
     * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
     * @param js_code 登录时获取的 code
     */
    code2Session(js_code: string): Promise<{
        session_key: string;
        unionid?: string;
        openid: string;
        errcode: number;
        errmsg: string;
    }>;
}
//# sourceMappingURL=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%99%BB%E5%BD%95.d.ts.map