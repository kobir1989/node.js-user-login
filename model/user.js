const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      minlength: 5,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
      maxlength: 20,
    },
    role: {
      type: String,
      default: "subscriber",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;
