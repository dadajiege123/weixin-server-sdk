一款目标是集成微信所有后端api的nodejs_SDK
希望有更多人来一起完成，因为涉及很多内容, 希望越来越好。
目前只集成了主要功能。
github地址: https://github.com/dadajiege123/weixin-server-sdk
使用方法:
```ts
import WeixinSDK from "weixin-server-sdk" 
const weixinSDK = new WeixinSDK();
async function startServer() {
    await weixinSDK.refreshConfig(() => ({
        WXMP_APPID: "wx8c9c5c5c5c5c5c5c",
        WXMP_APPSECRET: "8c9c5c5c5c5c5c5c5c5c5c5c5c5c5c5c",
        WXPAY_MCHID: "123456",
        WXPAY_mchApiCert_serialNo: "123456",
        WXPAY_mchApiCert_privateKeyPem: "123456",
        WXPAY_publicKeyID: "123456",
        WXPAY_publicKeyPem: "123456",
        WXPAY_APIV3_privateKey: "123456"
    }))
    或
    await weixinSDK.refreshConfig(async () => ({
        WXMP_APPID: await getAppId(),
        WXMP_APPSECRET: await getAppSecret(),
        WXPAY_MCHID: await getMchId(),
        WXPAY_mchApiCert_serialNo: await getMchApiCertSerialNo(),
        WXPAY_mchApiCert_privateKeyPem: await getMchApiCertPrivateKeyPem(),
        WXPAY_publicKeyID: await getPublicKeyID(),
        WXPAY_publicKeyPem: await getPublicKeyPem(),
        WXPAY_APIV3_privateKey: await getAPIV3PrivateKey()
    }))
}
```

如果您的配置是动态的，请使用以下方法,来刷新您的配置
```ts
await weixinSDK.refreshConfig();
```
如何使用呢？
```ts
let data = await weixinSDK.小程序.小程序登录.code2Session(js_code)
```
类关键字段使用中文名称, 以应对众多目录, 更方便使用, 建议配合微信文档一起食用哦
