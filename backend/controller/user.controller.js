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
  registerUsers: async (req, res) => {
    try {
        const users = [
            { fullname: "Alice Johnson", email: "alice@example.com", username: "alicej", password: "password123" },
            { fullname: "Bob Smith", email: "bob@example.com", username: "bobsmith", password: "password123" },
            { fullname: "Charlie Brown", email: "charlie@example.com", username: "charlieb", password: "password123" },
            { fullname: "David Lee", email: "david@example.com", username: "davidl", password: "password123" },
            { fullname: "Emma Watson", email: "emma@example.com", username: "emmaw", password: "password123" },
            { fullname: "Frank Ocean", email: "frank@example.com", username: "franko", password: "password123" },
            { fullname: "Grace Kelly", email: "grace@example.com", username: "gracek", password: "password123" },
            { fullname: "Henry Ford", email: "henry@example.com", username: "henryf", password: "password123" },
            { fullname: "Isla Fisher", email: "isla@example.com", username: "isla", password: "password123" },
            { fullname: "Jack White", email: "jack@example.com", username: "jackw", password: "password123" }
        ];

        const hashedUsers = await Promise.all(users.map(async (user) => ({
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            password: await bcrypt.hash(user.password, 10)
        })));

        const newUsers = await User.bulkCreate(hashedUsers);
        console.log("Users registered successfully:", newUsers);
        return res.status(201).json({ message: "Users registered successfully", users: newUsers });
    } catch (err) {
        console.error("Error registering users:", err.message);
        return res.status(500).json({ error: "Server Error" });
    }
}
};


export default UserController; // Correct export statement
