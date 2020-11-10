
const vacationDao = require("../Dao/vacation-dao");


async function getVacations() {
    return await vacationDao.getVacations();
  }

  async function createVacation(vacation) {
    await vacationDao.createVacation(vacation);
  }

  async function deleteVacation(id) {
    return await vacationDao.deleteVacation(id);
}

async function setVacation(vacation) {
  return await vacationDao.setVacation(vacation);
}

async function getVacationByID(id) {
  return await vacationDao.getVacationByID(id);
}

async function getUserFollowed(id) {
  return await vacationDao.getUserFollowed(id);
}  

async function updateTotallVacation(vacationID , isFollow) {
  if(isFollow){
    return await vacationDao.plusTotallVacation(vacationID);
  }
  else{
    return await vacationDao.minusTotallVacation(vacationID);
  }

}  

async function getAmountFollowers() {
  return await vacationDao.getAmountFollowers();
}  



module.exports = {
    getVacations,
    createVacation,
    deleteVacation,
    setVacation,
    getVacationByID,
    getUserFollowed,
    updateTotallVacation,
    getAmountFollowers
  };