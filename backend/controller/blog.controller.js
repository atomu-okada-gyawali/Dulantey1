import Blog from "../model/blog.model.js";
import User from "../model/user.model.js";
import Review from "../model/review.model.js";
import { Op } from "sequelize";
const blogController = {
  create: async (req, res) => {
    try {
      const {
        title,
        desc,
        location_id,
        user_id,
        categories_id,
        address,
        open_time,
        close_time,
      } = req.body;

      const photoPath = req.file ? req.file.path : null;

      const newBlog = await Blog.create({
        title: title,
        photos: photoPath,
        description: desc,
        location_id: location_id,
        user_id: user_id,
        categories_id: categories_id,
        address: address,
        open_time: open_time,
        close_time: close_time,
      });
      console.log("Blog created:", newBlog); // Log the created blog
      return res.status(201).json(newBlog); // Send the created blog as a response
    } catch (err) {
      console.error("Error creating Blog:", err.stack);
      return res.status(500).json({ error: "Error creating blog" }); // Send error response
    }
  },

  // update
  update: async (req, res) => {
    const { id } = req.params;
    const {
      title,
      photo,
      desc,
      location,
      user_id,
      categories_id,
      address,
      open_time,
      close_time,
    } = req.body;

    try {
      // Fetch existing blog data
      const existingBlog = await Blog.findOne({ where: { id: id } });
      if (!existingBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      // Create an object for the update
      const updatedData = {
        title: title !== undefined ? title : existingBlog.title,
        photos: req.file ? "uploads/" + req.file.filename : existingBlog.photos, // Use the filename from multer
        description: desc !== undefined ? desc : existingBlog.description,
        location_id:
          location !== undefined ? location : existingBlog.location_id,
        user_id: user_id !== undefined ? user_id : existingBlog.user_id,
        categories_id:
          categories_id !== undefined
            ? categories_id
            : existingBlog.categories_id,
        address: address !== undefined ? address : existingBlog.address,
        open_time: open_time !== undefined ? open_time : existingBlog.open_time,
        close_time:
          close_time !== undefined ? close_time : existingBlog.close_time,
      };

      // Perform the update
      const result = await Blog.update(updatedData, {
        where: { id: id },
      });

      if (result[0] === 0) {
        return console.log("No blog found to update");
      }
      res.status(200).json(updatedData); // Return the updated blog
      console.log("Blog updated successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },

  // delete
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Blog.destroy({ where: { id: id } });
      console.log("Blog deleted:", id); // Log the deleted blog ID
      return res.status(200).json({ message: "Blog deleted successfully" }); // Send success response
    } catch (err) {
      console.error("Error deleting Blog:", err.stack);
      return res.status(500).json({ error: "Error deleting blog" }); // Send error response
    }
  },

  //retrive all
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "username", "email", "profile"], // Include specific user fields
          },
        ],
        order: [["updatedAt", "DESC"]], // Sort by updatedAt in descending order
      });
      return res.status(200).json(blogs); // Send the list of blogs as a response
    } catch (err) {
      console.error("Error fetching all Blogs:", err.stack);
      return res.status(500).json({ error: "Error fetching blogs" }); // Send error response
    }
  },

  //retrive all (self profile view)
  getAllBlogsSelf: async (req, res) => {
    try {
      const user_id = req.params.id;
      const blogs = await Blog.findAll({
        where: { user_id: user_id },
        include: [
          {
            model: User,
            attributes: ["id", "username", "email", "profile"], // Include specific user fields
          },
        ],
        order: [["updatedAt", "DESC"]], // Sort by updatedAt in descending order
      });
      return res.status(200).json(blogs); // Send the list of blogs as a response
    } catch (err) {
      console.error("Error fetching all Blogs:", err.stack);
      return res.status(500).json({ error: "Error fetching blogs" }); // Send error response
    }
  },

  // retrive by id
  getBlogsById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["id", "username", "email"], // Include specific user fields
          },
        ],
      });
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" }); // Send not found response
      }
      return res.status(200).json(blog); // Send the blog as a response
    } catch (err) {
      console.error("Error fetching Blog:", err.stack);
      return res.status(500).json({ error: "Error fetching blog" }); // Send error response
    }
  },
  shareIncrease: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.increment("shares_count", {
        by: 1,
        where: { id: id },
      });
      return res.status(200).json(blog); // Send the blog as a response
    } catch (err) {
      console.error("Error Sharing:", err.stack);
      return res.status(500).json({ error: "Error sharing blog" });
    }
  },
};

export default blogController;
