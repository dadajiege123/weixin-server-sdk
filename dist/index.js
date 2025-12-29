import PublicUtils from './公共方法/index.js';
import Pay from './微信支付/index.js';
import WXMP from './小程序/WXMP.js';
import { callMaybeAsync } from './utils/callMaybeAsync.js';
export class WeixinSDK {
    config;
    getConfigFunc;
    公共方法;
    小程序;
    微信支付;
    constructor() {
        this.getConfigFunc = () => ({
            WXMP_APPID: '',
            WXMP_APPSECRET: '',
            WXPAY_MCHID: '',
            WXPAY_mchApiCert_serialNo: '',
            WXPAY_mchApiCert_privateKeyPem: '',
            WXPAY_publicKeyID: '',
            WXPAY_publicKeyPem: '',
            WXPAY_APIV3_privateKey: '',
        });
        this.config = this.getConfigFunc();
        this.公共方法 = new PublicUtils(this);
        this.小程序 = new WXMP(this);
        this.微信支付 = new Pay(this);
    }
    /**
     * 刷新配置
     */
    async refreshConfig(func) {
        if (func) {
            this.getConfigFunc = func;
            this.config = await callMaybeAsync(this.getConfigFunc);
        }
        else {
            this.config = await callMaybeAsync(this.getConfigFunc);
        }
    }
}
// 默认导出（可选）
export default WeixinSDK;
//# sourceMappingURL=index.js.map