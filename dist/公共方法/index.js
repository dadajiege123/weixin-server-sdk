import CallCredential from "./接口调用凭证.js";
import Authorization from "./签名认证.js";
import * as crypto from 'crypto';
import { WeixinSDKErr } from "../Error.js";
import { inspect } from "util";
export default class PublicUtils {
    调用凭证;
    签名认证;
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
        this.调用凭证 = new CallCredential(weixinSDK);
        this.签名认证 = new Authorization(weixinSDK);
    }
    /**
   * 使用微信支付公钥对敏感信息进行 RSA-OAEP 加密（SHA-1）
   * @param plaintext 明文（如手机号、银行卡号等）
   * @returns Base64 编码的密文
   */
    encryptSensitiveInfo(plaintext) {
        try {
            // 1. 将明文转为 Buffer（UTF-8）
            const data = Buffer.from(plaintext, 'utf8');
            // 2. 使用 RSA-OAEP 加密（必须指定 padding 和 hash）
            const encrypted = crypto.publicEncrypt({
                key: this.weixinSDK.config.WXPAY_publicKeyPem,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha1', // 微信要求 SHA-1
            }, data);
            // 3. 转为 Base64 字符串
            return encrypted.toString('base64');
        }
        catch (err) {
            throw new WeixinSDKErr({ code: 500, message: '加密明文失败', detail: inspect(err) });
        }
    }
    /**
    * 验证微信签名
    * @param rawBody //原始请求体
    * @param header 请求的header
    * @returns 是否验证成功
    */
    async verifySignature(rawBody, header) {
        try {
            //验证并解密 IncomingHttpHeaders
            let wechatpay_timeStamp = header["wechatpay-timestamp"];
            let wechatpay_nonce = header["wechatpay-nonce"];
            let wechatpay_signature = header["wechatpay-signature"];
            const verify = crypto.createVerify('RSA-SHA256');
            let sign_str = wechatpay_timeStamp + "\n" + wechatpay_nonce + "\n" + rawBody + "\n";
            verify.update(sign_str);
            //得到是否验证成功
            const signatureBuffer = Buffer.from(wechatpay_signature, 'base64');
            return verify.verify(this.weixinSDK.config.WXPAY_publicKeyPem, signatureBuffer);
        }
        catch (err) {
            throw new WeixinSDKErr({ code: 500, message: '验证微信签名失败', detail: inspect(err) });
        }
    }
    /**
     * 解密微信支付通知资源
     * @param resource
     * @returns
     */
    async decryptNotifyResource(resource) {
        try {
            const { ciphertext, associated_data, nonce, algorithm } = resource;
            // 1. 验证算法 (目前微信只支持 AEAD_AES_256_GCM)
            if (algorithm !== 'AEAD_AES_256_GCM') {
                throw new Error(`decryptNotifyResource: 不支持的加密算法: ${algorithm}`);
            }
            // 2. 将 Base64 密文解码为 Buffer
            const ciphertextBuffer = Buffer.from(ciphertext, 'base64');
            // 3. GCM 模式下，认证标签 (authTag) 是密文末尾的 16 字节
            const GCM_AUTH_TAG_LENGTH = 16;
            if (ciphertextBuffer.length < GCM_AUTH_TAG_LENGTH) {
                throw new Error('decryptNotifyResource: 密文长度不足，无法提取认证标签');
            }
            // 从密文末尾截取最后 16 字节作为 authTag
            const authTag = ciphertextBuffer.subarray(-GCM_AUTH_TAG_LENGTH);
            // 剩余部分是实际的加密数据
            const encryptedData = ciphertextBuffer.subarray(0, -GCM_AUTH_TAG_LENGTH);
            // 4. 创建解密器
            // 注意: key 是 APIv3 密钥，必须是 32 字节 (256位)
            const key = Buffer.from(this.weixinSDK.config.WXPAY_APIV3_privateKey, 'ascii');
            if (key.length !== 32) {
                throw new Error('decryptNotifyResource: APIv3密钥长度必须为32字节');
            }
            const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(nonce, 'utf8'));
            // 5. 设置附加认证数据 (AAD) 和 认证标签 (authTag)
            // ⚠️ 必须在 update/final 之前设置
            decipher.setAuthTag(authTag);
            const aad = associated_data ?? ''; // 或 (associated_data || '')
            decipher.setAAD(Buffer.from(aad, 'utf8'));
            try {
                // 6. 执行解密
                let decrypted = decipher.update(encryptedData).toString('utf-8');
                decrypted += decipher.final('utf8'); // 如果这里报错，就是认证失败
                // 7. 尝试解析为 JSON (微信通知通常是 JSON)
                try {
                    return JSON.parse(decrypted);
                }
                catch (jsonError) {
                    // 如果不是 JSON，返回原始字符串
                    throw new Error(`decryptNotifyResource: JSON解析失败,err: ${jsonError.message}`);
                }
            }
            catch (err) {
                // 常见错误: Unsupported state or unable to authenticate data
                // 原因: 密钥/nonce/associated_data 不匹配，或密文被篡改
                throw new Error(`decryptNotifyResource: 解密失败,err: ${err.message}`);
            }
        }
        catch (err) {
            throw new WeixinSDKErr({ code: 500, message: '解密微信支付通知失败', detail: inspect(err) });
        }
    }
}
//# sourceMappingURL=index.js.map