const express = require("express");
const route = express.Router();
const { createUser, getExistingUser, userLogin } = require("../controller/createUser");

//USer Login Requres
route.post("/login", userLogin);

module.exports = route;
