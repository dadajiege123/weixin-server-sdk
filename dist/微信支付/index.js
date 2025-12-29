import JSAPI from "./支付产品/JSAPI.js";
import MerchantTransfer from "./运营工具/MerchantTransfer.js";
export default class Pay {
    JSAPI;
    运营工具;
    constructor(weixinSDK) {
        this.JSAPI = new JSAPI(weixinSDK);
        this.运营工具 = {
            商家转账: new MerchantTransfer(weixinSDK)
        };
    }
}
//# sourceMappingURL=index.js.map