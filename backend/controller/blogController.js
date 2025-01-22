import Blog from "../model/blogModel";
const createBlog = async (req, res) => {
  try {
    const { title, photo, desc, location, user_id, categories_id } = req.body;
    const result = await Blog.create(
      title,
      photo,
      desc,
      location,
      user_id,
      categories_id
    );
    console.log("Blog created:", result.rows[0]); // Log the created blog
    return result.rows[0]; // Return the created blog
  } catch (err) {
    console.error("Error creating Blog:", err.stack);
    throw err; // Rethrow the error to handle it in the calling code
  }
};
export default { createBlog };
