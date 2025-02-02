import Blog from "../model/blog.model.js";

const blogController = {
  //create
  create: async (req, res) => {
    try {
      const { title, photo, desc, location, user_id, categories_id } = req.body;
      const newBlog = await Blog.create({
        title: title,
        photos: photo, // Ensure this is handled correctly if it's a file
        description: desc,
        location_id: location,
        user_id: user_id,
        categories_id: categories_id,
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
    try {
      const { id } = req.params;
      const { title, photo, desc, location, user_id, categories_id } = req.body;
      const updatedBlog = await Blog.update(
        {
          title: title,
          photos: photo,
          description: desc,
          location_id: location,
          user_id: user_id,
          categories_id: categories_id,
        },
        {
          where: { id: id },
          returning: true,
          plain: true
        }
      );
      console.log("Blog updated:", updatedBlog[1]);
      return res.status(200).json(updatedBlog[1]);
    } catch (err) {
      console.error("Error updating Blog:", err.stack);
      return res.status(500).json({ error: "Error updating blog" });
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
      const blogs = await Blog.findAll();
      return res.status(200).json(blogs); // Send all blogs as a response
    } catch (err) {
      console.error("Error fetching Blogs:", err.stack);
      return res.status(500).json({ error: "Error fetching blogs" }); // Send error response
    }
  },

  // retrive by id
  getBlogsById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByPk(id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" }); // Send not found response
      }
      return res.status(200).json(blog); // Send the blog as a response
    } catch (err) {
      console.error("Error fetching Blog:", err.stack);
      return res.status(500).json({ error: "Error fetching blog" }); // Send error response
    }
  }
};

export default blogController;
