import type WeixinSDK from "../index.js";
export default class CallCredential {
    weixinSDK: WeixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
  * 获取稳定版调用凭据
  * @param force_refresh //是否强制刷新  默认为false
  * @returns
  */
    getStableAccessToken(force_refresh?: boolean): Promise<{
        access_token: string;
        expires_in: number;
        errcode: number;
        errmsg: string;
    }>;
}
//# sourceMappingURL=%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E5%87%AD%E8%AF%81.d.ts.map