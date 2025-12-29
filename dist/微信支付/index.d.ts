import type WeixinSDK from "../index.js";
import JSAPI from "./支付产品/JSAPI.js";
import MerchantTransfer from "./运营工具/MerchantTransfer.js";
export default class Pay {
    JSAPI: JSAPI;
    运营工具: {
        商家转账: MerchantTransfer;
    };
    constructor(weixinSDK: WeixinSDK);
}
//# sourceMappingURL=index.d.ts.map