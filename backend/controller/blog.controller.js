import Blog from "../model/blog.model.js";

const blogController={
  create: async (req, res) => {
    try {
      const { title, photo, desc, location, user_id, categories_id } = req.body;
      const newBlog = await Blog.create({
        title:title,
        photos: photo, // Ensure this is handled correctly if it's a file
        description: desc,
        location_id: location,
        user_id:user_id,
        categories_id:categories_id,
      });
      console.log("Blog created:", newBlog); // Log the created blog
      return res.status(201).json(newBlog); // Send the created blog as a response
    } catch (err) {
      console.error("Error creating Blog:", err.stack);
      return res.status(500).json({ error: "Error creating blog" }); // Send error response
    }
}
}
export default blogController;
