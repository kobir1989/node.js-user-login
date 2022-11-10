const express = require("express");
const route = express.Router();
const { createUser, getExistingUser, userLogin } = require("../controller/createUser");

//User Get Request
route.get("/signin", getExistingUser);

//User Sign in Reqest
route.post("/signin", createUser);

module.exports = route;
