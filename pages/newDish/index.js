// index.js
// 获取应用实例
const app = getApp()
const globalData = app.globalData

Page({
  data: {
    type: 'add',
    id: '',
    dish: {
      name: '',
      nameErr: '',
      dec: '',
      decErr: '',
    }
  },
  onLoad(options) {
    console.log('onload', options);
    if (options.type === 'detail') {
      const dish = globalData.currentDish
      this.setData({
        'dish.name': dish.name,
        'dish.dec': dish.dec,
        id: dish._id,
        type: options.type
      })
      return
    }
    this.setData({
      'dish.name': '',
      'dish.dec': '',
      id: '',
      type: options.type
    })
  },
  onChangeName(e) {
    this.setData({
      'dish.name': e.detail
    })
  },
  onChangeDec(e) {
    this.setData({
      'dish.dec': e.detail
    })
  },
  // 事件处理函数
  bindAdd() {
    const name = this.data.dish.name
    const dec = this.data.dish.dec
    const nameErr = !!name ? '' : '缺少名称'
    const decErr = !!dec ? '' : '缺少做法'
    this.setData({
      'dish.nameErr': nameErr,
      'dish.decErr': decErr,
    })
    if (nameErr || decErr) {
      return
    }
    if (this.data.type === 'add') {
      this.addDish({name,dec})
    } else {
      this.updateDish({name,dec,id:this.data.id})
    }
  },
  addDish(dish) {
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'menu',
      // 传给云函数的参数
      data: {
        type: 'ADD',
        data: dish
      },
      success: res => {
        this.addSuccess(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '添加菜单失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },
  addSuccess(res) {
    console.log(res);
    wx.showToast({
      icon: 'success',
      title: '添加菜单成功',
    })
    this.setData({
      dish: {
        name: '',
        nameErr: '',
        dec: '',
        decErr: '',
      }
    })
  },
  updateDish(dish) {
    if (!dish.id) return
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'menu',
      // 传给云函数的参数
      data: {
        type: 'UPDATE',
        data: dish
      },
      success: res => {
        this.updateSuccess(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '更新菜单失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },
  updateSuccess(res) {
    console.log(res);
    wx.showToast({
      icon: 'success',
      title: '更新菜单成功',
    })
  },
})
