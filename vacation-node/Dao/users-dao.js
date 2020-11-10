let connection = require("./connection-wrapper");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function registered(user) {
  let sql =
    "INSERT INTO users (first_name,last_name,user_name,password) values(?, ?, ?, ?)";
  let parameters = [
    user.first_name,
    user.last_name,
    user.user_new_name,
    user.newPassword,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function isUserExistByName(user) {
  let sql = "SELECT user_name from users WHERE user_name = ? ";
  let parameters = [user.user_new_name];
  let check_user_name = await connection.executeWithParameters(sql, parameters);

  if (check_user_name == null || check_user_name.length == 0) {
    return false;
  }

  return true;
}

async function login(userLoginDetails) {
  let sql = "SELECT id, role FROM users where user_name =? and password =?";
  let parameters = [userLoginDetails.userName, userLoginDetails.password];
  let usersLoginResult;

  try {
    usersLoginResult = await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    console.error(e);
    throw new Error("General error");
  }
  // A functional (!) issue which means - the userName + password do not match
  if (usersLoginResult == null || usersLoginResult.length == 0) {
    throw new Error("Invalid name or password");
  }
  let successfulLoginResponse = {
    id: usersLoginResult[0].id,
    userType: usersLoginResult[0].role,
  };
  console.log("All good in Dao ! " + "*****" + usersLoginResult[0].id + "*****");
  return successfulLoginResponse;
}

async function createVacation(vacation) {
  let sql =
    "INSERT INTO vacations (description,destination,start_date,end_date,price,image) values(?, ?, ?, ?, ?, ?)";
  let parameters = [
    vacation.description,
    vacation.destination,
    vacation.start_date,
    vacation.end_date,
    vacation.price,
    vacation.image,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    console.log("\n\n\n");
    console.error(e);
    console.log("\n\n\n");
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function addNewFollow(followCurrentVacation) {
  let sql =
    "INSERT INTO followed_vacation (user_id,vacation_id) values(?, ?)";
  let parameters = [
    followCurrentVacation.userID,
    followCurrentVacation.vacationId,
  ];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}


async function deleteFollow(userID , vacationId) {
  let sql = "DELETE FROM followed_vacation WHERE user_id = ? AND vacation_id = ? ";
  let parameters = [
    userID,
    vacationId,
  ];

  await connection.executeWithParameters(sql, parameters);
}

module.exports = {
  registered,
  isUserExistByName,
  login,
  addNewFollow,
  deleteFollow
  
};
