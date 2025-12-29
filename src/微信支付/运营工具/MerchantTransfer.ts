import { WeixinSDKErr } from "../../Error.js";
import type WeixinSDK from "../../index.js";
import type { cent, RFC3339DateStr } from "../../types/global.js";

export default class MerchantTransfer {
    private weixinSDK: WeixinSDK
    constructor(weixinSDK: WeixinSDK) {
        this.weixinSDK = weixinSDK;
    }

    /**
     * 发起转账
     */
    public async applyTransfer(options: {
        appid: string,
        out_bill_no: string,
        transfer_scene_id: string,
        openid: string, //收款人的openid
        user_name?: string, //收款用户姓名
        transfer_amount: cent, //转账金额,分为单位
        transfer_remark: string, //转账备注,最多32个字符
        notify_url?: string, //异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。   
        user_recv_perception?: '活动奖励' | '现金奖励' | '退款' | '商家赔付' | '劳务报酬' | '报销款' | '企业补贴' | '开工利是' | '货款' | '二手回收货款' | '公益补助金' | '行政补贴' | '行政奖励' | '保险理赔款',
        transfer_scene_report_infos: {
            info_type: '活动名称' | '奖励说明',
            info_content: string,
        }[]
    }) {

        let body = JSON.stringify(options)
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: "/v3/fund-app/mch-transfer/transfer-bills",
            body
        })

        let response = await fetch('https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills',
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
            throw new WeixinSDKErr({ code, message })
        } else {
            let data = await response.json() as {
                out_bill_no: string,
                transfer_bill_no: string,
                create_time: RFC3339DateStr,
                state: 'ACCEPTED' | 'PROCESSING' | 'WAIT_USER_CONFIRM' | 'TRANSFERING' | 'SUCCESS' | 'FAIL' | 'CANCELING' | 'CANCELLED',
                package_info?: string, //仅当转账单据状态为WAIT_USER_CONFIRM时返回。
            };
            return data;
        }



    }


    /**
     * 撤销转账
     */
    public async revokeTransfer(out_bill_no: string) {
        let path = `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${out_bill_no}/cancel`
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path
        })

        let response = await fetch(`https://api.mch.weixin.qq.com${path}`,
            {
                method: 'POST',
                headers: {
                    "Authorization": authorization,
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        )



        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr({code,message})

        } else {
            let data = await response.json() as {
                out_bill_no: string,
                transfer_bill_no: string,
                state: 'CANCELING' | 'CANCELLED',
                update_time: RFC3339DateStr
            };
            return data;
        }



    }

    /**
     * 商户单号查询转账单
     * @param options
     * @returns 交易订单数据
     */
    public async findOneTransfer_by_outBillNo(options: {
        out_bill_no: string,
    }) {
        let path = `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${options.out_bill_no}`;

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
            throw new WeixinSDKErr({code, message});
        } else {
            let data = await response.json() as {
                mch_id: string,
                out_bill_no: string,
                transfer_bill_no: string,
                appid: string,
                state: 'ACCEPTED' | 'PROCESSING' | 'WAIT_USER_CONFIRM' | 'TRANSFERING' | 'SUCCESS' | 'FAIL' | 'CANCELING' | 'CANCELLED',
                transfer_amount: cent,
                transfer_remark: string,
                fail_reason?: string,
                openid?: string,
                user_name?: string,
                create_time: RFC3339DateStr,
                update_time: RFC3339DateStr
            }
            return data;

        }

    }

    /**
     * 微信单号查询转账单
     * @param options
     * @returns 
     */
    public async findOneTransfer_by_transferBillNo(options: {
        transfer_bill_no: string,
    }) {
        let path = `/v3/fund-app/mch-transfer/transfer-bills/transfer-bill-no/${options.transfer_bill_no}`;

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
            throw new WeixinSDKErr({code,message});
        } else {
            let data = await response.json() as {
                mch_id: string,
                out_bill_no: string,
                transfer_bill_no: string,
                appid: string,
                state: 'ACCEPTED' | 'PROCESSING' | 'WAIT_USER_CONFIRM' | 'TRANSFERING' | 'SUCCESS' | 'FAIL' | 'CANCELING' | 'CANCELLED',
                transfer_amount: cent,
                transfer_remark: string,
                fail_reason?: string,
                openid?: string,
                user_name?: string,
                create_time: RFC3339DateStr,
                update_time: RFC3339DateStr
            }
            return data;

        }

    }






}