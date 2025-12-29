import { WeixinSDKErr } from "../../Error.js";
export default class MerchantTransfer {
    weixinSDK;
    constructor(weixinSDK) {
        this.weixinSDK = weixinSDK;
    }
    /**
     * 发起转账
     */
    async applyTransfer(options) {
        let body = JSON.stringify(options);
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path: "/v3/fund-app/mch-transfer/transfer-bills",
            body
        });
        let response = await fetch('https://api.mch.weixin.qq.com/v3/fund-app/mch-transfer/transfer-bills', {
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
            throw new WeixinSDKErr({ code, message });
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 撤销转账
     */
    async revokeTransfer(out_bill_no) {
        let path = `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${out_bill_no}/cancel`;
        let authorization = this.weixinSDK.公共方法.签名认证.createAuthorization({
            method: "POST",
            path
        });
        let response = await fetch(`https://api.mch.weixin.qq.com${path}`, {
            method: 'POST',
            headers: {
                "Authorization": authorization,
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.ok == false) {
            let { code, message } = await response.json();
            throw new WeixinSDKErr({ code, message });
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 商户单号查询转账单
     * @param options
     * @returns 交易订单数据
     */
    async findOneTransfer_by_outBillNo(options) {
        let path = `/v3/fund-app/mch-transfer/transfer-bills/out-bill-no/${options.out_bill_no}`;
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
            throw new WeixinSDKErr({ code, message });
        }
        else {
            let data = await response.json();
            return data;
        }
    }
    /**
     * 微信单号查询转账单
     * @param options
     * @returns
     */
    async findOneTransfer_by_transferBillNo(options) {
        let path = `/v3/fund-app/mch-transfer/transfer-bills/transfer-bill-no/${options.transfer_bill_no}`;
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
            throw new WeixinSDKErr({ code, message });
        }
        else {
            let data = await response.json();
            return data;
        }
    }
}
//# sourceMappingURL=MerchantTransfer.js.map