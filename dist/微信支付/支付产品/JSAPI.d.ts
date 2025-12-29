import WeixinSDK from "../../index.js";
import type { cent, RFC3339DateStr } from "../../types/global.js";
export default class JSAPI {
    private weixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
     * 创建JSAPI支付订单
     * @param wxOrder
     * @returns prepay_id
     */
    placeOrder(wxOrder: wxOrder): Promise<string>;
    /**
     * 调起支付
     * @param prepay_id
     * @returns 调起支付方法需要的参数对象
     */
    invokePayment(prepay_id: string): {
        appid: string;
        timeStamp: number;
        nonceStr: string;
        package: string;
        signType: string;
        paySign: string;
    };
    /**
     * 微信支付订单号查询交易订单
     * @param options
     * @returns 交易订单数据
     */
    findOneTransactionOrder_by_transactionId(options: {
        transaction_id: string;
        mchid: string;
    }): Promise<{
        appid: string;
        mchid: string;
        out_trade_no: string;
        transaction_id: string;
        trade_type: "JSAPI" | "NATIVE" | "APP" | "MICROPAY" | "MWEB" | "FACEPAY";
        trade_state: "SUCCESS" | "REFUND" | "NOTPAY" | "CLOSED" | "REVOKED" | "USERPAYING" | "PAYERROR";
        trade_state_desc: string;
        bank_type?: string;
        attach?: string;
        success_time?: RFC3339DateStr;
        payer?: {
            openid?: string;
        };
        amount?: {
            total?: cent;
            payer_total?: cent;
            currency?: "CNY";
            payer_currency?: "CNY";
        };
        scene_info?: {
            device_id: string;
        };
        promotion_detail?: {
            coupon_id: string;
            name: string;
            scope?: "GLOBAL" | "SINGLE";
            type?: "CASH" | "NOCASH";
            amount: cent;
            stock_id?: string;
            wechatpay_contribute?: cent;
            merchant_contribute?: cent;
            other_contribute?: cent;
            currency?: "CNY";
            goods_detail?: {
                goods_id: string;
                quantity: number;
                unit_price: cent;
                discount_amount: cent;
                goods_remark?: string;
            };
        };
    }>;
    /**
     * 商户订单号查询交易订单
     * @param options
     * @returns 交易订单数据
     */
    findOneTransactionOrder_by_outTradeNo(options: {
        out_trade_no: string;
        mchid: string;
    }): Promise<{
        appid: string;
        mchid: string;
        out_trade_no: string;
        transaction_id: string;
        trade_type: "JSAPI" | "NATIVE" | "APP" | "MICROPAY" | "MWEB" | "FACEPAY";
        trade_state: "SUCCESS" | "REFUND" | "NOTPAY" | "CLOSED" | "REVOKED" | "USERPAYING" | "PAYERROR";
        trade_state_desc: string;
        bank_type?: string;
        attach?: string;
        success_time?: RFC3339DateStr;
        payer?: {
            openid?: string;
        };
        amount?: {
            total?: cent;
            payer_total?: cent;
            currency?: "CNY";
            payer_currency?: "CNY";
        };
        scene_info?: {
            device_id: string;
        };
        promotion_detail?: {
            coupon_id: string;
            name: string;
            scope?: "GLOBAL" | "SINGLE";
            type?: "CASH" | "NOCASH";
            amount: cent;
            stock_id?: string;
            wechatpay_contribute?: cent;
            merchant_contribute?: cent;
            other_contribute?: cent;
            currency?: "CNY";
            goods_detail?: {
                goods_id: string;
                quantity: number;
                unit_price: cent;
                discount_amount: cent;
                goods_remark?: string;
            };
        };
    }>;
    /**
     * 关闭交易订单
     * @param out_trade_no
     */
    closeTransactionOrder(out_trade_no: string): Promise<boolean>;
    /**
     * 退款申请
     * @param options
     * @returns
     */
    applyRefund(options: {
        transaction_id?: string;
        out_trade_no?: string;
        out_refund_no: string;
        reason?: string;
        notify_url?: string;
        funds_account?: 'AVAILABLE' | 'UNSETTLED';
        amount: {
            refund: cent;
            from?: {
                account: 'AVAILABLE' | 'UNAVAILABLE';
                amount: cent;
            }[];
            total: cent;
            currency: 'CNY';
        };
        goods_detail?: {
            merchant_goods_id: string;
            wechatpay_goods_id?: string;
            goods_name?: string;
            unit_price: cent;
            refund_amount: cent;
            refund_quantity: number;
        };
    }): Promise<{
        refund_id: string;
        out_refund_no: string;
        transaction_id: string;
        out_trade_no: string;
        channel: "ORIGINAL" | "BALANCE" | "OTHER_BALANCE" | "OTHER_BANKCARD";
        user_received_account: "\u9000\u56DE\u94F6\u884C\u5361" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u94B1" | "\u9000\u8FD8\u5546\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u94B1\u901A" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u94F6\u884C\u7535\u5B50\u8D26\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u82B1\u94B1" | "\u9000\u56DE\u7528\u6237\u7ECF\u8425\u8D26\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u6765\u534E\u96F6\u94B1\u5305" | "\u9000\u56DE\u4F01\u4E1A\u652F\u4ED8\u5546\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u5C0F\u91D1\u7F50" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u5206\u4ED8" | "\u9000\u56DE\u5FAE\u94F6\u901A";
        success_time?: RFC3339DateStr;
        create_time: RFC3339DateStr;
        status: "SUCCESS" | "CLOSED" | "PROCESSING" | "ABNORMAL";
        funds_account: "UNSETTLED" | "AVAILABLE" | "UNAVAILABLE" | "OPERATION" | "BASIC" | "ECNY_BASIC";
        amount: {
            total: cent;
            refund: cent;
            from?: {
                account: "AVAILABLE" | "UNAVAILABLE";
                amount: cent;
            }[];
            payer_total: cent;
            payer_refund: cent;
            settlement_refund: cent;
            settlement_total: cent;
            discount_refund: cent;
            currency: "CNY";
            refund_fee?: cent;
        };
        promotion_detail?: {
            promotion_id: string;
            scope: "GLOBAL" | "SINGLE";
            type: "CASH" | "NOCASH";
            amount: cent;
            refund_amount: cent;
            goods_detail?: {
                merchant_goods_id: string;
                wechatpay_goods_id?: string;
                goods_name?: string;
                unit_price: cent;
                refund_amount: cent;
                refund_quantity: number;
            }[];
        }[];
    }>;
    /**
    * 查询单笔退款（通过商户退款单号)
    * @param options
    * @returns 交易订单数据
    */
    findOneRefundOrder_by_outRefundNo(options: {
        out_refund_no: string;
    }): Promise<{
        refund_id: string;
        out_refund_no: string;
        transaction_id: string;
        out_trade_no: string;
        channel: "ORIGINAL" | "BALANCE" | "OTHER_BALANCE" | "OTHER_BANKCARD";
        user_received_account: "\u9000\u56DE\u94F6\u884C\u5361" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u94B1" | "\u9000\u8FD8\u5546\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u94B1\u901A" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u94F6\u884C\u7535\u5B50\u8D26\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u82B1\u94B1" | "\u9000\u56DE\u7528\u6237\u7ECF\u8425\u8D26\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u6765\u534E\u96F6\u94B1\u5305" | "\u9000\u56DE\u4F01\u4E1A\u652F\u4ED8\u5546\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u5C0F\u91D1\u7F50" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u5206\u4ED8" | "\u9000\u56DE\u5FAE\u94F6\u901A";
        success_time?: RFC3339DateStr;
        create_time: RFC3339DateStr;
        status: "SUCCESS" | "CLOSED" | "PROCESSING" | "ABNORMAL";
        funds_account: "UNSETTLED" | "AVAILABLE" | "UNAVAILABLE" | "OPERATION" | "BASIC" | "ECNY_BASIC";
        amount: {
            total: cent;
            refund: cent;
            from?: {
                account: "AVAILABLE" | "UNAVAILABLE";
                amount: cent;
            }[];
            payer_total: cent;
            payer_refund: cent;
            settlement_refund: cent;
            settlement_total: cent;
            discount_refund: cent;
            currency: "CNY";
            refund_fee?: cent;
        };
        promotion_detail?: {
            promotion_id: string;
            scope: "GLOBAL" | "SINGLE";
            type: "CASH" | "NOCASH";
            amount: cent;
            refund_amount: cent;
            goods_detail?: {
                merchant_goods_id: string;
                wechatpay_goods_id?: string;
                goods_name?: string;
                unit_price: cent;
                refund_amount: cent;
                refund_quantity: number;
            }[];
        }[];
    }>;
    /**
    * 发起异常退款
    * @param options
    * @returns 交易订单数据
    */
    applyAbnormalRefund(refund_id: string, options: {
        out_refund_no: string;
        type: 'USER_BANK_CARD' | 'MERCHANT_BANK_CARD';
        bank_type?: string;
        bank_account?: string;
        real_name?: string;
    }): Promise<{
        refund_id: string;
        out_refund_no: string;
        transaction_id: string;
        out_trade_no: string;
        channel: "ORIGINAL" | "BALANCE" | "OTHER_BALANCE" | "OTHER_BANKCARD";
        user_received_account: "\u9000\u56DE\u94F6\u884C\u5361" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u94B1" | "\u9000\u8FD8\u5546\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u94B1\u901A" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u94F6\u884C\u7535\u5B50\u8D26\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u96F6\u82B1\u94B1" | "\u9000\u56DE\u7528\u6237\u7ECF\u8425\u8D26\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u6765\u534E\u96F6\u94B1\u5305" | "\u9000\u56DE\u4F01\u4E1A\u652F\u4ED8\u5546\u6237" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u5C0F\u91D1\u7F50" | "\u9000\u56DE\u652F\u4ED8\u7528\u6237\u5206\u4ED8" | "\u9000\u56DE\u5FAE\u94F6\u901A";
        success_time?: RFC3339DateStr;
        create_time: RFC3339DateStr;
        status: "SUCCESS" | "CLOSED" | "PROCESSING" | "ABNORMAL";
        funds_account: "UNSETTLED" | "AVAILABLE" | "UNAVAILABLE" | "OPERATION" | "BASIC" | "ECNY_BASIC";
        amount: {
            total: cent;
            refund: cent;
            from?: {
                account: "AVAILABLE" | "UNAVAILABLE";
                amount: cent;
            }[];
            payer_total: cent;
            payer_refund: cent;
            settlement_refund: cent;
            settlement_total: cent;
            discount_refund: cent;
            currency: "CNY";
            refund_fee?: cent;
        };
        promotion_detail?: {
            promotion_id: string;
            scope: "GLOBAL" | "SINGLE";
            type: "CASH" | "NOCASH";
            amount: cent;
            refund_amount: cent;
            goods_detail?: {
                merchant_goods_id: string;
                wechatpay_goods_id?: string;
                goods_name?: string;
                unit_price: cent;
                refund_amount: cent;
                refund_quantity: number;
            }[];
        }[];
    }>;
    /**
    * 申请交易账单
    * @param options
    * @returns 交易订单数据
    */
    applyTradeBill(options: {
        bill_date: string;
        bill_type?: 'ALL' | 'SUCCESS' | 'REFUND';
        tar_type?: 'GZIP';
    }): Promise<{
        hash_type: "SHA1";
        hash_value: string;
        download_url: string;
    }>;
    /**
     * 申请资金账单
     */
    applyFundflowbill(options: {
        bill_date: string;
        account_type?: 'BASIC' | 'OPERATION' | 'FEES';
        tar_type?: 'GZIP';
    }): Promise<{
        hash_type: "SHA1";
        hash_value: string;
        download_url: string;
    }>;
    /**
     * 下载账单
     */
    downloadBill(options: {
        hash_type?: string;
        hash_value?: string;
        download_url: string;
    }): Promise<Buffer<ArrayBuffer>>;
}
export interface wxOrder {
    appid: string;
    mchid: string;
    description: string;
    out_trade_no: string;
    time_expire?: RFC3339DateStr;
    attach?: string;
    notify_url: string;
    goods_tag?: string;
    support_fapiao?: string;
    amount: {
        total: number;
        currency?: 'CNY';
    };
    payer: {
        openid: string;
    };
    detail?: {
        cost_price?: number;
        invoice_id?: string;
        goods_detail?: {
            merchant_goods_id: string;
            wechatpay_goods_id?: string;
            goods_name?: string;
            quantity: number;
            unit_price: number;
        };
    };
    scene_info?: {
        payer_client_ip: string;
        device_id?: string;
        store_info?: {
            id: string;
            name?: string;
            area_code?: string;
            address?: string;
        };
    };
    settle_info?: {
        profit_sharing: boolean;
    };
}
//# sourceMappingURL=JSAPI.d.ts.map