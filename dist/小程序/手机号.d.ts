import type WeixinSDK from "../index.js";
export default class PhoneNumber {
    private weixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
     * 用于将code换取用户手机号。 说明，每个code只能使用一次，code的有效期为5min
     */
    getPhoneNumber(code: string): Promise<{
        phone_info: {
            phoneNumber: string;
            purePhoneNumber: string;
            countryCode: string;
            watermark: {
                timestamp: number;
                appid: string;
            };
        };
        errcode: number;
        errmsg: string;
    }>;
}
//# sourceMappingURL=%E6%89%8B%E6%9C%BA%E5%8F%B7.d.ts.map