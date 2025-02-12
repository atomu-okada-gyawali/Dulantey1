import Location from "../model/location.model";

const LocationController = {
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const location = await Location.findByPk(id);
      if (!location) {
        return res.status(404).json({ error: "location not found" }); // Send not found response
      }
      return res.status(200).json(location); // Send the location as a response
    } catch (err) {
      console.error("Error fetching location:", err.stack);
      return res.status(500).json({ error: "Error fetching location" }); // Send error response
    }
  }
};
export default LocationController;