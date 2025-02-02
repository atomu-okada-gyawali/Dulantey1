import Review from "../model/review.model.js";
const reviewController = {
  // Create a new review
  create: async (req, res) => {
    try {
      const { blog_id, user_id, review } = req.body;

      const newReview = await Review.create({ blog_id, user_id, review });

      res.status(201).json(newReview);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Get average review score for a blog
  getAvg: async (req, res) => {
    try {
      const { blog_id } = req.params;

      const result = await Review.findOne({
        attributes: [
          [
            Review.sequelize.fn("AVG", Review.sequelize.col("review")),
            "average_review",
          ],
        ],
        where: { blog_id },
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching average review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Update a review for a blog by a specific user
  update: async (req, res) => {
    try {
      const { blog_id, user_id } = req.params;
      const { review } = req.body;

      const updatedReview = await Review.update(
        { review },
        {
          where: { blog_id, user_id },
          returning: true,
        }
      );

      if (!updatedReview[1][0]) {
        return res.status(404).json({ error: "Review not found" });
      }

      res.status(200).json(updatedReview[1][0]);
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default reviewController;
