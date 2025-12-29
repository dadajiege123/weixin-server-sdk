import type WeixinSDK from "../index.js";
export default class Authorization {
    weixinSDK: WeixinSDK;
    constructor(weixinSDK: WeixinSDK);
    createAuthorization(options: {
        method: string;
        path: string;
        body?: string;
    }): string;
}
//# sourceMappingURL=%E7%AD%BE%E5%90%8D%E8%AE%A4%E8%AF%81.d.ts.map