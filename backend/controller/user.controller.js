import User from "../model/user.model.js"; // Ensure this path is correct
const UserController = {
  registerUser: async (req, res) => {
    try {
      const { full_name, email, username } = req.body;
      const result = await User.create({
        full_name,
        email,
        username,
      });
      res.status(201).json(result); // Return the created user
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

export default UserController; // Correct export statement
