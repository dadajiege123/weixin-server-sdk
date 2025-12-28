import type { IncomingHttpHeaders } from "http";
import { WeixinSDKErr } from "../../Error.js";
import WeixinSDK from "../../index.js";
import * as crypto from 'crypto';
import type { cent, RFC3339DateStr } from "../../types/global.js";


export default class JSAPI {
    private weixinSDK: WeixinSDK;
    constructor(weixinSDK: WeixinSDK) {
        this.weixinSDK = weixinSDK;
    }


    /**
     * 创建JSAPI支付订单
     * @param wxOrder 
     * @returns prepay_id
     */
    public async placeOrder(wxOrder: wxOrder) {
        let body = JSON.stringify(wxOrder)
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: "/v3/pay/transactions/jsapi",
            body
        })

        let response = await fetch('https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi',
            {
                method: 'POST',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        } else {
            let { prepay_id } = await response.json() as { prepay_id: string };
            return prepay_id;
        }

    }

    /**
     * 调起支付
     * @param prepay_id 
     * @returns 调起支付方法需要的参数对象
     */
    public invokePayment(prepay_id: string) {
        //返回预支付交易会话标识, requestPayment小程序调起支付方法参数对象
        let nonceStr = crypto.randomBytes(16).toString('hex')
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
        }
    }

    /**
     * 微信支付订单号查询交易订单
     * @param options 
     * @returns 交易订单数据
     */
    public async findOneTransactionOrder_by_transactionId(options: {
        transaction_id: string,
        mchid: string,
    }) {
        let path = `/v3/pay/transactions/id/${options.transaction_id}?mchid=${options.mchid}`;

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        } else {
            let data = await response.json() as {
                appid: string,
                mchid: string,
                out_trade_no: string,
                transaction_id: string,
                trade_type: 'JSAPI' | 'NATIVE' | 'APP' | 'MICROPAY' | 'MWEB' | 'FACEPAY',
                trade_state: 'SUCCESS' | 'REFUND' | 'NOTPAY' | 'CLOSED' | 'REVOKED' | 'USERPAYING' | 'PAYERROR',
                trade_state_desc: string,
                bank_type?: string,
                attach?: string,
                success_time?: RFC3339DateStr,
                payer?: {
                    openid?: string
                },
                amount?: {
                    total?: cent,
                    payer_total?: cent,
                    currency?: 'CNY',
                    payer_currency?: 'CNY'
                },
                scene_info?: {
                    device_id: string
                },
                promotion_detail?: {
                    coupon_id: string,
                    name: string,
                    scope?: 'GLOBAL' | 'SINGLE',
                    type?: 'CASH' | 'NOCASH',
                    amount: cent,
                    stock_id?: string,
                    wechatpay_contribute?: cent,
                    merchant_contribute?: cent,
                    other_contribute?: cent,
                    currency?: 'CNY',
                    goods_detail?: {
                        goods_id: string,
                        quantity: number,
                        unit_price: cent,
                        discount_amount: cent,
                        goods_remark?: string
                    }
                }


            }
            return data;

        }

    }

    /**
     * 商户订单号查询交易订单
     * @param options 
     * @returns 交易订单数据
     */
    public async findOneTransactionOrder_by_outTradeNo(options: {
        out_trade_no: string,
        mchid: string,
    }) {
        let path = `/v3/pay/transactions/out_trade_no/${options.out_trade_no}?mchid=${options.mchid}`;

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        } else {
            let data = await response.json() as {
                appid: string,
                mchid: string,
                out_trade_no: string,
                transaction_id: string,
                trade_type: 'JSAPI' | 'NATIVE' | 'APP' | 'MICROPAY' | 'MWEB' | 'FACEPAY',
                trade_state: 'SUCCESS' | 'REFUND' | 'NOTPAY' | 'CLOSED' | 'REVOKED' | 'USERPAYING' | 'PAYERROR',
                trade_state_desc: string,
                bank_type?: string,
                attach?: string,
                success_time?: RFC3339DateStr,
                payer?: {
                    openid?: string
                },
                amount?: {
                    total?: cent,
                    payer_total?: cent,
                    currency?: 'CNY',
                    payer_currency?: 'CNY'
                },
                scene_info?: {
                    device_id: string
                },
                promotion_detail?: {
                    coupon_id: string,
                    name: string,
                    scope?: 'GLOBAL' | 'SINGLE',
                    type?: 'CASH' | 'NOCASH',
                    amount: cent,
                    stock_id?: string,
                    wechatpay_contribute?: cent,
                    merchant_contribute?: cent,
                    other_contribute?: cent,
                    currency?: 'CNY',
                    goods_detail?: {
                        goods_id: string,
                        quantity: number,
                        unit_price: cent,
                        discount_amount: cent,
                        goods_remark?: string
                    }
                }


            }
            return data;

        }

    }


    /**
     * 关闭交易订单
     * @param out_trade_no 
     */
    public async closeTransactionOrder(out_trade_no: string) {
        let body = JSON.stringify({
            mchid: this.weixinSDK.config.WXPAY_MCHID
        })
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: `/v3/pay/transactions/out-trade-no/${out_trade_no}/close`,
            body
        })
        let response = await fetch(`https://api.mch.weixin.qq.com/v3/pay/transactions/out-trade-no/${out_trade_no}/close`, {
            method: "POST",
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        })
        if (response.ok === true) {
            return true;
        } else {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`code:${code}, message:${message}`);
        }


    }

    /**
     * 退款申请
     * @param options 
     * @returns 
     */
    public async applyRefund(options: {
        transaction_id?: string,
        out_trade_no?: string,
        out_refund_no: string,
        reason?: string,
        notify_url?: string,
        funds_account?: 'AVAILABLE' | 'UNSETTLED',
        amount: {
            refund: cent,
            from?: {
                account: 'AVAILABLE' | 'UNAVAILABLE',
                amount: cent
            }[],
            total: cent,
            currency: 'CNY'
        },
        goods_detail?: {
            merchant_goods_id: string,
            wechatpay_goods_id?: string,
            goods_name?: string,
            unit_price: cent,
            refund_amount: cent,
            refund_quantity: number
        }
    }) {

        //退款
        let body = JSON.stringify(options)

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: '/v3/refund/domestic/refunds',
            body: body
        })
        let response = await fetch('https://api.mch.weixin.qq.com/v3/refund/domestic/refunds', {
            method: "POST",
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: body
        })

        if (response.ok === true) {
            let data = await response.json() as {
                refund_id: string,
                out_refund_no: string,
                transaction_id: string,
                out_trade_no: string,
                channel: 'ORIGINAL' | 'BALANCE' | 'OTHER_BALANCE' | 'OTHER_BANKCARD',
                user_received_account: '退回银行卡' | '退回支付用户零钱' | '退还商户' | '退回支付用户零钱通' | '退回支付用户银行电子账户' | '退回支付用户零花钱' | '退回用户经营账户' | '退回支付用户来华零钱包' | '退回企业支付商户' | '退回支付用户小金罐' | '退回支付用户分付' | '退回微银通',
                success_time?: RFC3339DateStr,
                create_time: RFC3339DateStr,
                status: 'SUCCESS' | 'CLOSED' | 'PROCESSING' | 'ABNORMAL',
                funds_account: 'UNSETTLED' | 'AVAILABLE' | 'UNAVAILABLE' | 'OPERATION' | 'BASIC' | 'ECNY_BASIC',
                amount: {
                    total: cent,
                    refund: cent,
                    from?: {
                        account: 'AVAILABLE' | 'UNAVAILABLE',
                        amount: cent
                    }[],
                    payer_total: cent,
                    payer_refund: cent,
                    settlement_refund: cent,
                    settlement_total: cent,
                    discount_refund: cent,
                    currency: 'CNY',
                    refund_fee?: cent
                },
                promotion_detail?: {
                    promotion_id: string,
                    scope: 'GLOBAL' | 'SINGLE',
                    type: 'CASH' | 'NOCASH',
                    amount: cent,
                    refund_amount: cent,
                    goods_detail?: {
                        merchant_goods_id: string,
                        wechatpay_goods_id?: string,
                        goods_name?: string,
                        unit_price: cent,
                        refund_amount: cent,
                        refund_quantity: number
                    }[]
                }[]
            };
            return data
        } else {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyRefund: code: ${code}: message: ${message}`)
        }

    }

    /**
    * 查询单笔退款（通过商户退款单号)
    * @param options 
    * @returns 交易订单数据
    */
    public async findOneRefundOrder_by_outRefundNo(options: {
        out_refund_no: string,
    }) {
        let path = `/v3/refund/domestic/refunds/${options.out_refund_no}`;

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`findOneRefundOrder_by_outRefundNo: code:${code}, message:${message}`);
        } else {
            let data = await response.json() as {
                refund_id: string,
                out_refund_no: string,
                transaction_id: string,
                out_trade_no: string,
                channel: 'ORIGINAL' | 'BALANCE' | 'OTHER_BALANCE' | 'OTHER_BANKCARD',
                user_received_account: '退回银行卡' | '退回支付用户零钱' | '退还商户' | '退回支付用户零钱通' | '退回支付用户银行电子账户' | '退回支付用户零花钱' | '退回用户经营账户' | '退回支付用户来华零钱包' | '退回企业支付商户' | '退回支付用户小金罐' | '退回支付用户分付' | '退回微银通',
                success_time?: RFC3339DateStr,
                create_time: RFC3339DateStr,
                status: 'SUCCESS' | 'CLOSED' | 'PROCESSING' | 'ABNORMAL',
                funds_account: 'UNSETTLED' | 'AVAILABLE' | 'UNAVAILABLE' | 'OPERATION' | 'BASIC' | 'ECNY_BASIC',
                amount: {
                    total: cent,
                    refund: cent,
                    from?: {
                        account: 'AVAILABLE' | 'UNAVAILABLE',
                        amount: cent
                    }[],
                    payer_total: cent,
                    payer_refund: cent,
                    settlement_refund: cent,
                    settlement_total: cent,
                    discount_refund: cent,
                    currency: 'CNY',
                    refund_fee?: cent
                },
                promotion_detail?: {
                    promotion_id: string,
                    scope: 'GLOBAL' | 'SINGLE',
                    type: 'CASH' | 'NOCASH',
                    amount: cent,
                    refund_amount: cent,
                    goods_detail?: {
                        merchant_goods_id: string,
                        wechatpay_goods_id?: string,
                        goods_name?: string,
                        unit_price: cent,
                        refund_amount: cent,
                        refund_quantity: number
                    }[]
                }[]
            }
            return data;
        }

    }

    /**
    * 发起异常退款
    * @param options 
    * @returns 交易订单数据
    */
    public async applyAbnormalRefund(refund_id: string, options: {
        out_refund_no: string,
        type: 'USER_BANK_CARD' | 'MERCHANT_BANK_CARD',
        bank_type?: string,
        bank_account?: string,
        real_name?: string
    }) {
        let path = `/v3/refund/domestic/refunds/${refund_id}/apply-abnormal-refund`;

        if (options.bank_account) {
            options.bank_account = this.weixinSDK.公共方法.encryptSensitiveInfo(options.bank_account)
        }
        if (options.real_name) {
            options.real_name = this.weixinSDK.公共方法.encryptSensitiveInfo(options.real_name)
        }

        let body = JSON.stringify(options)

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: path,
            body
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                },
                body
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyAbnormalRefund: code:${code}, message:${message}`);
        } else {
            let data = await response.json() as {
                refund_id: string,
                out_refund_no: string,
                transaction_id: string,
                out_trade_no: string,
                channel: 'ORIGINAL' | 'BALANCE' | 'OTHER_BALANCE' | 'OTHER_BANKCARD',
                user_received_account: '退回银行卡' | '退回支付用户零钱' | '退还商户' | '退回支付用户零钱通' | '退回支付用户银行电子账户' | '退回支付用户零花钱' | '退回用户经营账户' | '退回支付用户来华零钱包' | '退回企业支付商户' | '退回支付用户小金罐' | '退回支付用户分付' | '退回微银通',
                success_time?: RFC3339DateStr,
                create_time: RFC3339DateStr,
                status: 'SUCCESS' | 'CLOSED' | 'PROCESSING' | 'ABNORMAL',
                funds_account: 'UNSETTLED' | 'AVAILABLE' | 'UNAVAILABLE' | 'OPERATION' | 'BASIC' | 'ECNY_BASIC',
                amount: {
                    total: cent,
                    refund: cent,
                    from?: {
                        account: 'AVAILABLE' | 'UNAVAILABLE',
                        amount: cent
                    }[],
                    payer_total: cent,
                    payer_refund: cent,
                    settlement_refund: cent,
                    settlement_total: cent,
                    discount_refund: cent,
                    currency: 'CNY',
                    refund_fee?: cent
                },
                promotion_detail?: {
                    promotion_id: string,
                    scope: 'GLOBAL' | 'SINGLE',
                    type: 'CASH' | 'NOCASH',
                    amount: cent,
                    refund_amount: cent,
                    goods_detail?: {
                        merchant_goods_id: string,
                        wechatpay_goods_id?: string,
                        goods_name?: string,
                        unit_price: cent,
                        refund_amount: cent,
                        refund_quantity: number
                    }[]
                }[]
            }
            return data;
        }

    }

    /**
    * 申请交易账单
    * @param options
    * @returns 交易订单数据
    */
    public async applyTradeBill(options: {
        bill_date: string,
        bill_type?: 'ALL' | 'SUCCESS' | 'REFUND',
        tar_type?: 'GZIP'
    }) {
        let path = `/v3/bill/tradebill?bill_date=${options.bill_date}&bill_type=${options.bill_type}&tar_type=${options.tar_type}`;

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyTradeBill: code:${code}, message:${message}`);
        } else {
            let data = await response.json() as {
                hash_type: 'SHA1',
                hash_value: string,
                download_url: string
            }
            return data;
        }

    }

    /**
     * 申请资金账单
     */
    public async applyFundflowbill(options: {
        bill_date: string,
        account_type?: 'BASIC' | 'OPERATION' | 'FEES',
        tar_type?: 'GZIP'
    }) {
        let path = `/v3/bill/fundflowbill?bill_date=${options.bill_date}&account_type=${options.account_type}&tar_type=${options.tar_type}`;

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr(`applyFundflowbill: code:${code}, message:${message}`);
        } else {
            let data = await response.json() as {
                hash_type: 'SHA1',
                hash_value: string,
                download_url: string
            }
            return data;
        }

    }

    /**
     * 下载账单
     */
    public async downloadBill(options: {
        hash_type?: string,
        hash_value?: string,
        download_url: string
    }) {
        const { hash_type, hash_value, download_url } = options;
        const url = new URL(download_url);
        const path = url.pathname + url.search;

        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "GET",
            path: path,
        })

        let response = await fetch(download_url,
            {
                method: 'GET',
                headers: {
                    "Authorization": authorization,
                },
            }
        )
        const contentType = response.headers.get('content-type') || '';

        if (response.ok == false) {
            if (contentType.includes('application/json')) {
                let { code, message } = await response.json();
                throw new WeixinSDKErr(`downloadBill: code:${code}, message:${message}`);
            } else {
                const text = await response.text();
                throw new WeixinSDKErr(`downloadBill: 下载账单失败, HTTP状态码: ${response.status}, text: ${text}`);
            }
        } else {
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




export interface wxOrder {
    appid: string,
    mchid: string,
    description: string,
    out_trade_no: string,
    time_expire?: RFC3339DateStr,
    attach?: string,
    notify_url: string,
    goods_tag?: string,
    support_fapiao?: string,
    amount: { total: number, currency?: 'CNY' },
    payer: { openid: string },
    detail?: {
        cost_price?: number,
        invoice_id?: string,
        goods_detail?: {
            merchant_goods_id: string,
            wechatpay_goods_id?: string,
            goods_name?: string,
            quantity: number,
            unit_price: number
        }
    },
    scene_info?: {
        payer_client_ip: string,
        device_id?: string,
        store_info?: {
            id: string,
            name?: string,
            area_code?: string,
            address?: string,
        }
    },
    settle_info?: {
        profit_sharing: boolean
    }
}
