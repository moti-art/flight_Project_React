const config = require('../config.json');
const jwt = require('jsonwebtoken');
let usersDao = require("../dao/users-dao");
let  usersCache = require("../Dao/Cache")
// let ServerError = require("../errors/server-error");
// let ErrorType = require("../errors/error-type");

async function registered(user) {
  if (await usersDao.isUserExistByName(user)) {
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  await usersDao.registered(user);
}

async function login(userLoginDetails) {
  let userLoginData = await usersDao.login(userLoginDetails);

  const token = jwt.sign({ sub: userLoginDetails.userName }, config.secret);
  usersCache.addItem(token, userLoginData);
  // Do something with cache and stuff.. token....
  console.log(userLoginData);

  let successfullLoginResponse = {
    token: token,
    userType: userLoginData.userType,
    userName: userLoginDetails.userName,
    user_id: userLoginData.id
  };
  return successfullLoginResponse;
}

async function addNewFollow(followCurrentVacation) {
 return await usersDao.addNewFollow(followCurrentVacation);
}

async function deleteFollow(userID , vacationId) {
 return await usersDao.deleteFollow(userID , vacationId);
}


module.exports = {
  registered,
  login,
  addNewFollow,
  deleteFollow
  
};
