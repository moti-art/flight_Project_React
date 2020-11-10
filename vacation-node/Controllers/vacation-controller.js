let vacationsLogic = require("../Logic/vacation-logic");
const express = require("express");
// const usersCache = new Map();

const router = express.Router();
router.post("/addVacation", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let vacation = request.body;

  try {
    let addVacation = await vacationsLogic.createVacation(vacation);
    response.json(addVacation);
  } catch (error) {
    return next(error);
  }
});

router.get("/admin", async (request, response, next) => {

  try {
      let get = await vacationsLogic.getVacations();
      return response.json(get);
  }
  catch (error) {
      return next(error);
  }
});



router.get("/admin/:id", async (request, response, next) => {

  const id = request.params.id;
  try {
      let getByID = await vacationsLogic.getVacationByID(id);
      return response.json(getByID);
  }
  catch (error) {
      return next(error);
  }
});

router.delete("/admin/:id", async (request, response, next) => {
  const id = request.params.id;
  // Extracting the JSON from the packet's BODY

  try {
    let deleteS = await vacationsLogic.deleteVacation(id);
    response.json(deleteS);
  } catch (error) {
    return next(error);
  }
});

router.put("/editVacation/:id", async (request, response, next) => {
  const vacation = request.body;
  // Extracting the JSON from the packet's BODY

  try {
    let set = await vacationsLogic.setVacation(vacation);
    response.json(set);
  } catch (error) {
    return next(error);
  }
});

router.get("/user/:id", async (request, response, next) => {

  const id = request.params.id;
  try {
      let getUserByID = await vacationsLogic.getUserFollowed(id);
      return response.json(getUserByID);
  }
  catch (error) {
      return next(error);
  }
});

router.put("/user/:id", async (request, response, next) => {
  const data = request.body;
  try {
      let vacation = await vacationsLogic.updateTotallVacation(data.vacationId , data.isFollow);
     response.json(vacation);
  }
  catch (error) {
      return next(error);
  }
});

router.get("/charts", async (request, response, next) => {

  try {
      let data = await vacationsLogic.getAmountFollowers();
      return response.json(data);
     
  }
  catch (error) {
      return next(error);
  }
});







module.exports = router;