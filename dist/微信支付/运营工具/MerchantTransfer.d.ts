import type WeixinSDK from "../../index.js";
import type { cent, RFC3339DateStr } from "../../types/global.js";
export default class MerchantTransfer {
    private weixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
     * 发起转账
     */
    applyTransfer(options: {
        appid: string;
        out_bill_no: string;
        transfer_scene_id: string;
        openid: string;
        user_name?: string;
        transfer_amount: cent;
        transfer_remark: string;
        notify_url?: string;
        user_recv_perception?: '活动奖励' | '现金奖励' | '退款' | '商家赔付' | '劳务报酬' | '报销款' | '企业补贴' | '开工利是' | '货款' | '二手回收货款' | '公益补助金' | '行政补贴' | '行政奖励' | '保险理赔款';
        transfer_scene_report_infos: {
            info_type: '活动名称' | '奖励说明';
            info_content: string;
        }[];
    }): Promise<{
        out_bill_no: string;
        transfer_bill_no: string;
        create_time: RFC3339DateStr;
        state: "ACCEPTED" | "PROCESSING" | "WAIT_USER_CONFIRM" | "TRANSFERING" | "SUCCESS" | "FAIL" | "CANCELING" | "CANCELLED";
        package_info?: string;
    }>;
    /**
     * 撤销转账
     */
    revokeTransfer(out_bill_no: string): Promise<{
        out_bill_no: string;
        transfer_bill_no: string;
        state: "CANCELING" | "CANCELLED";
        update_time: RFC3339DateStr;
    }>;
    /**
     * 商户单号查询转账单
     * @param options
     * @returns 交易订单数据
     */
    findOneTransfer_by_outBillNo(options: {
        out_bill_no: string;
    }): Promise<{
        mch_id: string;
        out_bill_no: string;
        transfer_bill_no: string;
        appid: string;
        state: "ACCEPTED" | "PROCESSING" | "WAIT_USER_CONFIRM" | "TRANSFERING" | "SUCCESS" | "FAIL" | "CANCELING" | "CANCELLED";
        transfer_amount: cent;
        transfer_remark: string;
        fail_reason?: string;
        openid?: string;
        user_name?: string;
        create_time: RFC3339DateStr;
        update_time: RFC3339DateStr;
    }>;
    /**
     * 微信单号查询转账单
     * @param options
     * @returns
     */
    findOneTransfer_by_transferBillNo(options: {
        transfer_bill_no: string;
    }): Promise<{
        mch_id: string;
        out_bill_no: string;
        transfer_bill_no: string;
        appid: string;
        state: "ACCEPTED" | "PROCESSING" | "WAIT_USER_CONFIRM" | "TRANSFERING" | "SUCCESS" | "FAIL" | "CANCELING" | "CANCELLED";
        transfer_amount: cent;
        transfer_remark: string;
        fail_reason?: string;
        openid?: string;
        user_name?: string;
        create_time: RFC3339DateStr;
        update_time: RFC3339DateStr;
    }>;
}
//# sourceMappingURL=MerchantTransfer.d.ts.map