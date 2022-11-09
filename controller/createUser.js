const User = require("../model/user");

//Create new user and save in the Database
const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body);
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

//Get Existing user Data from Database
const getExistingUser = async (_, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { createUser, getExistingUser };
