class WeixinSDKErr extends Error {
  constructor(message: string) {
    super(message);
    this.name = "weixinSDKErr";
  }

}

export { WeixinSDKErr };