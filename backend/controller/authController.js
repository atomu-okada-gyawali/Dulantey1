import User from "../model/user.model.js";
import generateToken from "../security/jwt-util.js";

const login = async (req, res) => {
  try {
    //fetching all the data from users table
    if (req.body.email == null) {
      return res.status(400).send({ message: "email is required" });
    }
    if (req.body.password == null) {
      return res.status(400).send({ message: "password is required" });
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    if (user.password === req.body.password) {
      const token = generateToken({ user: user.toJSON() });
      return res.status(200).send({
        data: { access_token: token },
        message: "successfully logged in",
      });
    } else {
      return res.status(401).send({ message: "incorrect password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to login" });
  }
};
const init = async (req, res) => {
  try {
    const user = req.user; 
    delete user.password; // Remove password from user object
    res
      .status(201)
      .send({ data: user, message: "successfully fetched current user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export default { login, init };
