// index.js
// 获取应用实例
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    menu: [],
  },
  onShow() {
    this.getMenuList()
  },
  // 跳转到指定菜品
  bindDetail(event) {
    console.log(event, '---');
    const dish = event.currentTarget.dataset.dish
    globalData.currentDish = {...dish}
    wx.navigateTo({
      url: `../newDish/index?id=${dish._id}&type=detail`
    })
  },
  // 跳转到添加菜品
  bindAdd() {
    wx.navigateTo({
      url: '../newDish/index?type=add'
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('用户信息', res)
      }
    })
  },
  getMenuList() {
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'menu',
      // 传给云函数的参数
      data: {
        type: 'LIST'
      },
      success: res => {
        console.log(res);
        const data = res.result.data
        this.setData({
          menu: data
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '获取菜单失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },
})
