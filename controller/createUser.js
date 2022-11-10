const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { find } = require("../model/user");

//Create new user and save in the Database
const createUser = async (req, res) => {
  try {
    //collect all information
    const { firstname, lastname, email, password } = req.body;

    //validating the data, if exists
    if (!(firstname && lastname && email && password)) {
      res.status(401).send("All the input field required");
    }

    //checking if email is in correct format
    if (!email.includes("@")) {
      res.status(401).send("Invalid Email");
    }

    //check if user exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).send("User already exist in the database");
    }

    //encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    });

    //create a token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      "shhhhh",
      { expiresIn: "2h" }
    );
    user.token = token;

    res.status(201).json(user.token);
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
};

//Checking User Login Validation

const userLogin = async (req, res) => {
  try {
    //Collect user info
    const { email, password } = req.body;

    //Checking email and password validation
    if (!(email && password)) {
      res.status(401).send("All the input field must be filled");
    }

    //check user in database
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.status(401).send("User does not exist");
    }

    //match the password
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const token = jwt.sign({ id: findUser._id, email }, "shhhhh", { expiresIn: "2h" });
      findUser.token = token;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      //create token and send
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        findUser,
      });
    }

    res.status(400).send("email or password is incorrect");
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

module.exports = { createUser, getExistingUser, userLogin };
