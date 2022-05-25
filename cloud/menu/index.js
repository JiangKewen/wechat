// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({
  // env: 'cloud1-6gg3inr32d697f7e',
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

const list = async () => {
  const res = await db.collection("menu").get();
  return res.data;
};
const add = async (dish) => {
  const res = await db.collection("menu").add({
    data: dish,
  });
  //   { message: "添加成功" }
  //   { message: "添加失败" }
  return res;
};
const del = (dish) => {
  return { message: "删除成功" };
};
const update = async (dish) => {
  const res = await db.collection("menu").doc(dish.id).update({
    data: {
      name: dish.name,
      dec: dish.dec,
    }
  });
  return res.data;
};

// 云函数入口函数
exports.main = async (event, context) => {
  const type = event.type;
  let res = null;
  switch (type) {
    case "LIST":
      res = await list();
      break;
    case "ADD":
      res = await add(event.data);
      break;
    case "DELTE":
      res = await del(event.data);
      break;
    case "UPDATE":
      res = await update(event.data);
      break;

    default:
      break;
  }

  // cloud.database().collection('menu').get()

  return {
    code: 0,
    data: res,
  };
};
