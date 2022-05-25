# 笔记

- app.json [全局配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)

```json
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Weixin",
    "navigationBarTextStyle":"black"
  }
}
```

- project.config.json 工具配置

- page.json 每个[页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)

- page.js JS逻辑交互

```js
const app = getApp()
const globalData = app.globalData
Page({
  data: {
    msg: '',
  },
  onLoad: function () {
    // 页面渲染后 执行
  },
  clickMe: function() {
    this.setData({ msg: "Hello World" })
  }
})
```

- app.js

```js
App({
  globalData: {},
  onLaunch: function () {
    // 小程序启动之后 触发
  }
})
```

- 模块

```js
// common.js
function sayHello(name) {
  console.log(`Goodbye ${name} !`)
}
module.exports.sayHello = sayHello

// index.js
var common = require('common.js')
Page({
  helloMINA: function() {
    common.sayHello('MINA')
  }
})

```

- 视图 WXML

```html
<view wx:for="{{array}}"> {{item}} </view>

<view wx:if="{{view == 'WEBVIEW'}}"> WEBVIEW </view>
<view wx:elif="{{view == 'APP'}}"> APP </view>

<view style="color:{{color}};" />

<view data-alpha-beta="1" data-alphaBeta="2" bindtap="bindViewTap"> DataSet Test </view>
```

- WXSS

```css
/* 屏幕宽度750rpx */
@import "common.wxss";
```

- [事件](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
- [屏幕旋转](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html)
- [自定义组件](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
- [按需注入](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/lazyload.html)

- 云开发

```js
wx.cloud.callFunction({
  // 云函数名称
  name: 'cloudFunc',
  // 传给云函数的参数
  data: {
    a: 1,
    b: 2,
  },
  success: function(res) {
    console.log(res.result) // 示例
  },
  fail: console.error
})
```

- api
  - wx.getLocation 地理位置
  - wx.scanCode 扫一扫
  - wx.navigateTo 打开新页面
  - wx.navigatoBack 页面返回
  - wx.redirectTo 页面重定向
  - wx.reLaunch 重启动
  - wx.setStorageSync 本地储存
