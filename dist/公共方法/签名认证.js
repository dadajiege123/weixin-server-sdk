import { inspect } from "util";
import { WeixinSDKErr } from "../Error.js";
import * as crypto from 'crypto';
export default class Authorization {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    //生成authorization
    createAuthorization(options) {
        try {
            const { method, path, body } = options;
            //当前时间的秒数
            let currentSecond = Date.now() / 1000;
            //随机不大于32个的字符串
            const nonce_str = crypto.randomBytes(16).toString('hex');
            let signText = method + '\n' + path + '\n' + currentSecond + '\n' + nonce_str + '\n';
            if (body != null) {
                signText = signText + body + '\n';
            }
            else {
                signText = signText + '\n';
            }
            const sign = crypto.createSign('RSA-SHA256').update(signText).sign(this.weixinSDK.config.WXPAY_mchApiCert_privateKeyPem, 'base64');
            let authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${this.weixinSDK.config.WXPAY_MCHID}",nonce_str="${nonce_str}",serial_no="${this.weixinSDK.config.WXPAY_mchApiCert_serialNo}",timestamp="${currentSecond}",signature="${sign}"`;
            return authorization;
        }
        catch (err) {
            throw new WeixinSDKErr({ code: 500, message: '签名认证失败', detail: inspect(err) });
        }
    }
}
//# sourceMappingURL=%E7%AD%BE%E5%90%8D%E8%AE%A4%E8%AF%81.js.map