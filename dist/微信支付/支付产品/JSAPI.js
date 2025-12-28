import { WeixinSDKErr } from "../../Error.js";
import WeixinSDK from "../../index.js";
import * as crypto from 'crypto';
export default class JSAPI {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 创建JSAPI支付订单
     * @param wxOrder
     * @returns prepay_id
     */
    async placeOrder(wxOrder) {
        let body = JSON.stringify(wxOrder);
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: "/v3/pay/transactions/jsapi",
            body
        });
        let response = await fetch('https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi', {
            method: 'POST',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        }
        else {
            let { prepay_id } = await response.json();
            return prepay_id;
        }
    }
    /**
     * 调起支付
     * @param prepay_id
     * @returns 调起支付方法需要的参数对象
     */
    invokePayment(prepay_id) {
        //返回预支付交易会话标识, requestPayment小程序调起支付方法参数对象
        let nonceStr = crypto.randomBytes(16).toString('hex');
        let currentTime = Date.now() / 1000;
        let signStr = `${this.weixinSDK.config.WXMP_APPID}\n${currentTime}\n${nonceStr}\nprepay_id=${prepay_id}\n`;
        const signedStr = crypto.createSign('RSA-SHA256').update(signStr).sign(this.weixinSDK.config.WXPAY_mchApiCert_privateKeyPem, 'base64');
        return {
            appid: this.weixinSDK.config.WXMP_APPID,
            timeStamp: currentTime,
            nonceStr: nonceStr,
            package: `prepay_id=${prepay_id}`,
            signType: 'RSA',
            paySign: signedStr
        };
    }
    /**
     * 微信支付订单号查询交易订单
     * @param options
     * @returns 交易订单数据
     */
    async findOneTransactionOrder_by_transactionId(options) {
        let path = `/v3/pay/transactions/id/${options.transaction_id}?mchid=${options.mchid}`;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 商户订单号查询交易订单
     * @param options
     * @returns 交易订单数据
     */
    async findOneTransactionOrder_by_outTradeNo(options) {
        let path = `/v3/pay/transactions/out_trade_no/${options.out_trade_no}?mchid=${options.mchid}`;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 关闭交易订单
     * @param out_trade_no
     */
    async closeTransactionOrder(out_trade_no) {
        let body = JSON.stringify({
            mchid: this.weixinSDK.config.WXPAY_MCHID
        });
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: `/v3/pay/transactions/out-trade-no/${out_trade_no}/close`,
            body
        });
        let response = await fetch(`https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/${out_trade_no}/close`, {
            method: "POST",
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });
        if (response.ok === true) {
            return true;
        }
        else {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        }
    }
    /**
     * 退款申请
     * @param options
     * @returns
     */
    async applyRefund(options) {
        //退款
        let body = JSON.stringify(options);
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: '/v3/refund/domestic/refunds',
            body: body
        });
        let response = await fetch('https://api.mch.weixin.qq.com/v3/refund/domestic/refunds', {
            method: "POST",
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        });
        if (response.ok === true) {
            let data = await response.json();
            return data;
        }
        else {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyRefund: code: ${code}: message: ${message}`);
        }
    }
    /**
    * 查询单笔退款（通过商户退款单号)
    * @param options
    * @returns 交易订单数据
    */
    async findOneRefundOrder_by_outRefundNo(options) {
        let path = `/v3/refund/domestic/refunds/${options.out_refund_no}`;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`findOneRefundOrder_by_outRefundNo: code:${code}, message:${message}`);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
    * 发起异常退款
    * @param options
    * @returns 交易订单数据
    */
    async applyAbnormalRefund(refund_id, options) {
        let path = `/v3/refund/domestic/refunds/${refund_id}/apply-abnormal-refund`;
        if (options.bank_account) {
            options.bank_account = this.weixinSDK.公共方法.encryptSensitiveInfo(options.bank_account);
        }
        if (options.real_name) {
            options.real_name = this.weixinSDK.公共方法.encryptSensitiveInfo(options.real_name);
        }
        let body = JSON.stringify(options);
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: path,
            body
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyAbnormalRefund: code:${code}, message:${message}`);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
    * 申请交易账单
    * @param options
    * @returns 交易订单数据
    */
    async applyTradeBill(options) {
        let path = `/v3/bill/tradebill?bill_date=${options.bill_date}&bill_type=${options.bill_type}&tar_type=${options.tar_type}`;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyTradeBill: code:${code}, message:${message}`);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 申请资金账单
     */
    async applyFundflowbill(options) {
        let path = `/v3/bill/fundflowbill?bill_date=${options.bill_date}&account_type=${options.account_type}&tar_type=${options.tar_type}`;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyFundflowbill: code:${code}, message:${message}`);
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 下载账单
     */
    async downloadBill(options) {
        const { hash_type, hash_value, download_url } = options;
        const url = new URL(download_url);
        const path = url.pathname + url.search;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        });
        let response = await fetch(download_url, {
            method: 'GET',
            headers: {
                "Authorization": authorization,
            },
        });
        const contentType = response.headers.get('content-type') || '';
        if (response.ok == false) {
            if (contentType.includes('application/json')) {
                let { code, message } = await response.json();
                throw new WeixinSDKErr(`downloadBill: code:${code}, message:${message}`);
            }
            else {
                const text = await response.text();
                throw new WeixinSDKErr(`downloadBill: 下载账单失败, HTTP状态码: ${response.status}, text: ${text}`);
            }
        }
        else {
            let arrayBuffer = await response.arrayBuffer();
            // 2. 转为 Buffer
            const buffer = Buffer.from(arrayBuffer);
            if (hash_type && hash_value) {
                // 3. 计算哈希
                const actualHash = crypto
                    .createHash(hash_type)
                    .update(buffer)
                    .digest('hex')
                    .toLowerCase();
                // 4. 校验
                if (actualHash !== hash_value.toLowerCase()) {
                    throw new WeixinSDKErr(`downloadBill: 账单哈希校验失败`);
                }
            }
            return buffer;
        }
    }
}
//# sourceMappingURL=JSAPI.js.map