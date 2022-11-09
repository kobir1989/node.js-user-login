const express = require("express");
const route = express.Router();
const { createUser, getExistingUser } = require("../controller/createUser");

//User Get Request
route.get("/user", getExistingUser);

//User POST Reqest
route.post("/user", createUser);

module.exports = route;
