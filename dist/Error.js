class WeixinSDKErr extends Error {
    code;
    message;
    detail;
    constructor(response) {
        super(response.message);
        this.name = "weixinSDKErr";
        this.code = response.code;
        this.message = response.message;
        this.detail = response.detail ?? '';
    }
}
export { WeixinSDKErr };
//# sourceMappingURL=Error.js.map