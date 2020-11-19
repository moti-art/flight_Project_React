const express = require("express");
const usersController = require("./controllers/users-controller");
const vacationsController = require("./Controllers/vacation-controller");
const errorHandler = require("./errors/error-handler");
const server = express();
const cors = require("cors");

const loginFilter = require("./middleware/login-filter");

server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.use(loginFilter());
// Extract the JSON from the body and create request.body object containing it:
server.use(express.json());

server.use("/users", usersController);
server.use("/vacations", vacationsController);
// server.use(errorHandler);
var port = process.env.port || 3001;
server.listen(port, () => console.log("Listening on http://localhost:3001"));
