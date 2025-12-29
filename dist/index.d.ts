import PublicUtils from './公共方法/index.js';
import Pay from './微信支付/index.js';
import WXMP from './小程序/WXMP.js';
export interface WeixinSDKConfig {
    WXMP_APPID: string;
    WXMP_APPSECRET: string;
    WXPAY_MCHID: string;
    WXPAY_mchApiCert_serialNo: string;
    WXPAY_mchApiCert_privateKeyPem: string;
    WXPAY_publicKeyID: string;
    WXPAY_publicKeyPem: string;
    WXPAY_APIV3_privateKey: string;
}
type getConfigFunc = (() => WeixinSDKConfig) | (() => Promise<WeixinSDKConfig>);
export declare class WeixinSDK {
    config: WeixinSDKConfig;
    private getConfigFunc;
    公共方法: PublicUtils;
    小程序: WXMP;
    微信支付: Pay;
    constructor();
    /**
     * 刷新配置
     */
    refreshConfig(func?: getConfigFunc): Promise<void>;
}
export default WeixinSDK;
//# sourceMappingURL=index.d.ts.map