import type { IncomingHttpHeaders } from "http";
import type WeixinSDK from "../index.js";
import CallCredential from "./接口调用凭证.js";
import Authorization from "./签名认证.js";
export default class PublicUtils {
    调用凭证: CallCredential;
    签名认证: Authorization;
    private weixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
   * 使用微信支付公钥对敏感信息进行 RSA-OAEP 加密（SHA-1）
   * @param plaintext 明文（如手机号、银行卡号等）
   * @returns Base64 编码的密文
   */
    encryptSensitiveInfo(plaintext: string): string;
    /**
    * 验证微信签名
    * @param rawBody //原始请求体
    * @param header 请求的header
    * @returns 是否验证成功
    */
    verifySignature(rawBody: string, header: IncomingHttpHeaders): Promise<boolean>;
    /**
     * 解密微信支付通知资源
     * @param resource
     * @returns
     */
    decryptNotifyResource(resource: {
        algorithm: string;
        ciphertext: string;
        associated_data?: string;
        original_type: string;
        nonce: string;
    }): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map