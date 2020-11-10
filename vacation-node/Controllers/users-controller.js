let usersLogic = require("../logic/users-logic");
const express = require("express");
// const usersCache = new Map();

const router = express.Router();

// POST http://localhost:3000/users/login
router.post("/", async (request, response, next) => {
  // Extracting the JSON from the packet's BODY
  let user = request.body;

  try {
    let addUser = await usersLogic.registered(user);
    response.json(addUser);
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (request, response) => {
  let userLoginDetails = request.body;
  try {
    let successfulLoginResponse = await usersLogic.login(userLoginDetails);
    response.json(successfulLoginResponse);
  } catch (error) {
    console.error(error);
    response.status(600).send({ message: error.message });
  }
});

router.post("/user/:id", async (request, response) => {
  const data = request.body;
  try {
    let Newfollow = await usersLogic.addNewFollow(data);
    response.json(Newfollow);
  } catch (error) {
    console.error(error);
    response.status(600).send({ message: error.message });
  }
});


router.put("/user/:id", async (request, response) => {
  const data = request.body;
  try {
    let follow = await usersLogic.deleteFollow(data.userID , data.vacationId);
    response.json(follow);
  } catch (error) {
    console.error(error);
    response.status(600).send({ message: error.message });
  }
});







module.exports = router;
