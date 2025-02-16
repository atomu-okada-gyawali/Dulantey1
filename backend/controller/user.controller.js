import User from "../model/user.model.js";
import bcrypt from "bcrypt";
const UserController = {
  registerUser: async (req, res) => {
    try {
      const { fullname, password, email, username } = req.body;

      console.log("Received data:", req.body);

      // Check if all required fields are provided
      if (!fullname || !password || !email || !username) {
        console.log("Missing required fields");
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        console.log("User already exists");
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const result = await User.create({
        fullname,
        password: hashedPassword,
        email,
        username,
      });

      console.log("User created successfully:", result);

      // Return the created user
      res.status(201).json(result);
    } catch (err) {
      console.error("Error registering user:", err.message);
      res.status(500).send("Server Error");
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: {
          id: id,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user); // Return all users
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  uploadProfile: async (req, res) => {
    const { id, photo } = req.body;

    try {
      const result = await User.update(
        {
          profile: update,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (result[0] === 0) {
        return console.log("No user found to update");
      }
      console.log("Profile updated successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  updateUser: async (req, res) => {
    const { password, full_name, email, username, photo } = req.body;
    const { id } = req.params;
    try {
      const result = await User.update(
        {
          full_name: full_name,
          email: email,
          password: password,
          username: username,
          profile: photo,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (result[0] === 0) {
        return console.log("No user found to update");
      }
      res.status(201).json(result); // Return the created user
      console.log("User updated successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await User.destroy({
        where: {
          id: id,
        },
      });
      if (result === 0) {
        return console.log("No user found to delete");
      }
      res.status(201).json(result); // Return the deleted user
      console.log("User deleted successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

export default UserController; // Correct export statement
