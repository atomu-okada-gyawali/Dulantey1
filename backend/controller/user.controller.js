import User from "../model/user.model.js"; // Ensure this path is correct
const UserController = {
  registerUser: async (req, res) => {
    try {
      const { full_name, password, email, username } = req.body;
      const result = await User.create({
        full_name: full_name,
        password: password,
        email: email,
        username: username,
      });
      res.status(201).json(result); // Return the created user
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.body;
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
    const { id, password, full_name, email, username, photo } = req.body;

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
      console.log("User updated successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.body;
    try {
      const result = await User.destroy({
        where: {
          id: id,
        },
      });
      if (result === 0) {
        return console.log("No user found to delete");
      }
      console.log("User deleted successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

export default UserController; // Correct export statement
