import Comment from "../model/comment.model.js";
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
      console.log("Comment created:", comments); // Log the created Comment
      return res.status(201).json(comments); // Send the created Comment as a response
    } catch (err) {
      return res.status(500).json({ error: "Error creating Comment" }); // Send error response
    }
  },
};
export default commentController;
