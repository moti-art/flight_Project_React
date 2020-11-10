const { JsonWebTokenError } = require("jsonwebtoken");
let connection = require("./connection-wrapper");
// let ErrorType = require("../errors/error-type");
// let ServerError = require("../errors/server-error");
async function getVacations() {
  let sql = "SELECT * FROM vacations";
  return await connection.execute(sql);
}
async function getVacationByID(id) {
  let sql = "SELECT * FROM vacations WHERE id=?";
  let parameters = [id];

  return await connection.executeWithParameters(sql, parameters);
}

async function createVacation(vacation) {
  let sql =
    "INSERT INTO vacations (description,destination,start_date,end_date,price,image) values(?, ?, ?, ?, ?, ?)";
  let parameters = [
    vacation.description,
    vacation.destination,
    vacation.startDate,
    vacation.endDate,
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

async function deleteVacation(id) {
  let sql = "DELETE FROM vacations WHERE id = ?";
  let parameters = [id];

  await connection.executeWithParameters(sql, parameters);
}

async function setVacation(vacation) {
  let sql =
    "UPDATE vacations SET description=? , destination=? , start_date=? , end_date=? , price=? , image=? WHERE id = ?";
  let parameters = [
    vacation.description,
    vacation.destination,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    vacation.image,
    vacation.id,
  ];

  await connection.executeWithParameters(sql, parameters);
}

async function getUserFollowed(user_id) {
  let sql =
    "SELECT * FROM toursTag.vacations v left join (select * from toursTag.followed_vacation fv  Where user_id = ?) fv on v.id = fv.vacation_id;";
  let parameters = [user_id];

  let response = await connection.executeWithParameters(sql, parameters);
  // if(response)
  let vacations = [];
  let isFollowed;
  
  for (let i = 0; i < response.length; i++) {
    if (response[i].vacation_id == null) {
      isFollowed = false;
    } else {
      isFollowed = true;
    }
    let currentVacation = {
      id: response[i].id,
      description: response[i].description,
      destination: response[i].destination,
      startDate: response[i].start_date,
      endDate: response[i].end_date,
      price: response[i].price,
      image: response[i].image,
      isFollowed: isFollowed,
    };

    vacations.push(currentVacation);
  }
  vacations.sort(function (vacationA, vacationB) {
    if (vacationA.isFollowed) {
      return -1;
    }
    return 1;
  });

  return vacations;
}

async function plusTotallVacation(vacationID) {

    let sql =
    "UPDATE vacations set amount_of_followers= amount_of_followers+1 WHERE id = ? ;";
  let parameters = [vacationID];

  await connection.executeWithParameters(sql, parameters);
}


async function minusTotallVacation(vacationID) {

  let sql =
  "UPDATE vacations set amount_of_followers= amount_of_followers-1 WHERE id = ? ;";
let parameters = [vacationID];

await connection.executeWithParameters(sql, parameters);
}

async function getAmountFollowers() {
  let sql = "SELECT id, amount_of_followers, description FROM vacations";
  return await connection.execute(sql);
}



module.exports = {
  getVacations,
  createVacation,
  deleteVacation,
  setVacation,
  getVacationByID,
  getUserFollowed,
  minusTotallVacation,
  plusTotallVacation,
  getAmountFollowers
};
