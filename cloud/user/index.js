// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env: 'cloud1-6gg3inr32d697f7e',
  env: cloud.DYNAMIC_CURRENT_ENV,
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let a = event.a
  let b = event.b

  // cloud.database().collection('datas').get()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    res: a + b
  }
}