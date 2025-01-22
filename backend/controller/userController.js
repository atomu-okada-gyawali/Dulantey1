import { query } from "../config/db";
const User = require("../model/userModel");
const registerUser = async (req, res) => {
  try {
    const { fullname, email, username, date_of_birth, location } = req.body;
    const result = await User.create(
      fullname,
      email,
      username,
      date_of_birth,
      location
    );
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = { registerUser };
