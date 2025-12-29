

class WeixinSDKErr extends Error {
  code: number;
  message: string;
  detail: string;

  constructor(
    response: {
      code: number,
      message: string,
      detail?: string | undefined | null
    },

  ) {
    super(response.message)
    this.name = "weixinSDKErr";
    this.code = response.code;
    this.message = response.message;
    this.detail = response.detail ?? '';
  }
}




export { WeixinSDKErr };