import type { WeixinSDK } from "../index.js";
export default class WXMP_QRCodeAndURL {
    private weixinSDK;
    constructor(weixinSDK: WeixinSDK);
    /**
     * 获取小程序码（永久有效, 数量限制）
     * @param options
     * @returns
     */
    getQRCode(options: {
        path: string;
        width?: number;
        auto_color?: boolean;
        line_color?: {
            r: number;
            g: number;
            b: number;
        };
        is_hyaline?: boolean;
        env_version?: string;
    }): Promise<ArrayBuffer>;
    /**
     * 获取小程序码（永久有效, 数量不限制）
     * @param options
     * @returns
     */
    getUnlimitedQRCode(options: {
        scene: string;
        page?: string;
        check_path?: boolean;
        env_version?: string;
        width?: number;
        auto_color?: boolean;
        line_color?: {
            r: number;
            g: number;
            b: number;
        };
        is_hyaline?: boolean;
    }): Promise<ArrayBuffer>;
    /**
    * 获取小程序二维码（永久有效, 数量限制）
    * @param options
    * @returns
    */
    createQRCode(options: {
        path: string;
        width?: number;
    }): Promise<ArrayBuffer>;
}
//# sourceMappingURL=%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%A0%81%E4%B8%8E%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%93%BE%E6%8E%A5.d.ts.map