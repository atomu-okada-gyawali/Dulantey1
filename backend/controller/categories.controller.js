import Categories from "../model/categories.model";

const CategoriesController = {
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Categories.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" }); // Send not found response
      }
      return res.status(200).json(category); // Send the category as a response
    } catch (err) {
      console.error("Error fetching Category:", err.stack);
      return res.status(500).json({ error: "Error fetching category" }); // Send error response
    }
  }
};
export default CategoriesController;