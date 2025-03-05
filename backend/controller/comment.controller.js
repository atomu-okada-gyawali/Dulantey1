import Comment from "../model/comment.model.js";
import User from "../model/user.model.js";
const commentController = {
  create: async (req, res) => {
    try {
      const { user_id, blog_id, content } = req.body;
      const newComment = await Comment.create({
        user_id: user_id,
        blog_id: blog_id,
        content: content,
      });
      console.log("Comment created:", newComment); // Log the created Comment
      return res.status(201).json(newComment); // Send the created Comment as a response
    } catch (err) {
      console.error("Error creating Comment:", err.stack);
      return res.status(500).json({ error: "Error creating Comment" }); // Send error response
    }
  },
  getComments: async (req, res) => {
    try {
        const blog_id = req.params.blog_id;
        const comments = await Comment.findAll({
            where: { blog_id: blog_id },
            include: [
                {
                    model: User,
                    attributes: ["username", "profile"],
                },
            ],
        });
        console.log(`Comments retrieved for blog ID ${blog_id}:`, comments); // More informative log
        return res.status(200).json(comments); // Use 200 for successful retrieval
    } catch (err) {
        console.error("Error getting comments:", err); // Log the error for debugging
        return res.status(500).json({ error: "Error getting comments" }); // More descriptive error response
    }
}
};
export default commentController;
