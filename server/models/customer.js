// models/user.js
const db = require('../config/db.js'), 
      userModel = '../schema/Customers.js'; // 引入user的表结构
const testDb = db.connectDB; // 引入数据库
const User = testDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async function (data) { // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  const userInfo = await User.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      uid: data.uid
    }
  });

  return userInfo // 返回数据
}

const loginUserByName = async function (data){
  const userInfo = await User.findOne({
    where: {
      uname: data.uname
    }
  })
  return userInfo
}

const getUserByName = async function (data){
  const userInfo = await User.findOne({
    where: {
      uname: data.uname ? data.uname : {
        '$like': data.keywordOfUname ? '%' + data.keywordOfUname + '%' : '%'
      }
    }
  })

  return userInfo
}

const createNewUser = async function (userInfo) {
  await User.create({
    uname: userInfo.uname,
    uemail: userInfo.uemail,
    upassword: userInfo.upassword,
    ucity: userInfo.ucity,
    uoccupation: userInfo.uoccupation,
    upic: userInfo.upic
    });
}

const updateUserInfo = async function (uname, updateData) {
  await User.update(updateData,
  {
    where: {
      uname: uname
    }
  });
}

module.exports = {
  getUserById,
  loginUserByName,
  getUserByName,
  createNewUser,
  updateUserInfo
}