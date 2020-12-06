const path = require('path');
const express = require("express");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./Controllers/vacation-controller");
const errorHandler = require("./errors/error-handler");
const server = express();
const loginFilter = require("./middleware/login-filter");

const PORT = process.env.PORT || 3001;

const buildPath = path.join(__dirname, '..', 'build');
server.use(express.static(buildPath));


server.use(loginFilter());
// Extract the JSON from the body and create request.body object containing it:
server.use(express.json());

server.use("/users", usersController);
server.use("/vacations", vacationsController);
// server.use(errorHandler);

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });