declare class WeixinSDKErr extends Error {
    code: number;
    message: string;
    detail: string;
    constructor(response: {
        code: number;
        message: string;
        detail?: string | undefined | null;
    });
}
export { WeixinSDKErr };
//# sourceMappingURL=Error.d.ts.map