import Blog from "../model/blog.model.js";
import User from "../model/user.model.js";
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
          address: address,
          open_time: open_time,
          close_time: close_time,
        },
        {
          where: { id: id },
          returning: true,
          plain: true,
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
  getNext5Blogs: async (req, res) => {
    try {
      const fromBlogId = parseInt(req.params.fromBlogId);
      if (isNaN(fromBlogId)) {
        return res.status(400).json({ error: "Invalid starting blog ID" });
      }

      let blogs;
      if (fromBlogId === -1) {
        // Fetch the first 5 blogs sorted by id descending
        blogs = await Blog.findAll({
          order: [["id", "DESC"]],
          limit: 5,
          include: [
            {
              model: User,
              attributes: ["id", "username", "email", "profile"], // Include specific user fields
            },
          ],
        });
      } else {
        // Fetch the next 5 blogs with id descending, starting after the given blog ID
        blogs = await Blog.findAll({
          where: {
            id: { [Op.lt]: fromBlogId }, // Fetch blogs with ID less than fromBlogId
          },
          order: [["id", "DESC"]],
          limit: 5,
          include: [
            {
              model: User,
              attributes: ["id", "username", "email", "profile"], // Include specific user fields
            },
          ],
        });
      }

      return res.status(200).json(blogs);
    } catch (err) {
      console.error("Error fetching Blogs:", err.stack);
      return res.status(500).json({ error: "Error fetching blogs" });
    }
  },
  //retrive all (self profile view)
  get5BlogsSelf: async (req, res) => {
    try {
      const user_id = req.params.id;
      const fromBlogId = parseInt(req.params.fromBlogId);
      if (isNaN(fromBlogId)) {
        return res.status(400).json({ error: "Invalid starting blog ID" });
      }

      let blogs;
      if (fromBlogId === -1) {
        // Fetch the first 5 blogs sorted by id descending
        blogs = await Blog.findAll({
          where: {
            user_id: user_id
          },
          order: [["id", "DESC"]],
          limit: 5,
          include: [
            {
              model: User,
              attributes: ["id", "username", "email", "profile"] // Include specific user fields
            }
          ]
        });
      } else {
        // Fetch the next 5 blogs with id descending, starting after the given blog ID
        blogs = await Blog.findAll({
          where: {
            id: { [Op.lt]: fromBlogId }, // Fetch blogs with ID less than fromBlogId
            user_id: user_id
          },
          order: [["id", "DESC"]],
          limit: 5,
          include: [
            {
              model: User,
              attributes: ["id", "username", "email", "profile"] // Include specific user fields
            }
          ]
        });
      }

      return res.status(200).json(blogs);
    } catch (err) {
      console.error("Error fetching Blogs:", err.stack);
      return res.status(500).json({ error: "Error fetching blogs" });
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

  insertMockBlogs: async (req, res) => {
    try {
      const mockBlogs = [
        {
          title: "Exploring Tokyo",
          description: "A journey through Tokyo's streets",
          location_id: 1,
          user_id: 1,
          categories_id: 2,
          address: "Shibuya, Tokyo",
          open_time: "08:00",
          close_time: "20:00",
          photos: "/uploads/photo1.jpg",
        },
        {
          title: "Parisian Cafes",
          description: "Best cafes in Paris",
          location_id: 2,
          user_id: 2,
          categories_id: 3,
          address: "Champs-Élysées, Paris",
          open_time: "09:00",
          close_time: "21:00",
          photos: "/uploads/photo2.jpg",
        },
        {
          title: "New York Nightlife",
          description: "A guide to NYC's best clubs",
          location_id: 3,
          user_id: 3,
          categories_id: 1,
          address: "Manhattan, NY",
          open_time: "20:00",
          close_time: "04:00",
          photos: "/uploads/photo3.jpg",
        },
        {
          title: "Beaches of Bali",
          description: "A relaxing getaway",
          location_id: 4,
          user_id: 4,
          categories_id: 2,
          address: "Kuta Beach, Bali",
          open_time: "06:00",
          close_time: "18:00",
          photos: "/uploads/photo4.jpg",
        },
        {
          title: "The Alps Adventure",
          description: "Hiking the Swiss Alps",
          location_id: 5,
          user_id: 5,
          categories_id: 3,
          address: "Zermatt, Switzerland",
          open_time: "07:00",
          close_time: "19:00",
          photos: "/uploads/photo5.jpg",
        },
        {
          title: "Street Food in Bangkok",
          description: "Top street foods to try",
          location_id: 6,
          user_id: 1,
          categories_id: 1,
          address: "Bangkok, Thailand",
          open_time: "10:00",
          close_time: "22:00",
          photos: "/uploads/photo6.jpg",
        },
        {
          title: "Santorini Sunsets",
          description: "Best spots for sunsets",
          location_id: 1,
          user_id: 2,
          categories_id: 2,
          address: "Oia, Santorini",
          open_time: "15:00",
          close_time: "23:00",
          photos: "/uploads/photo7.jpg",
        },
        {
          title: "Amazon Rainforest",
          description: "Wildlife and adventures",
          location_id: 2,
          user_id: 3,
          categories_id: 3,
          address: "Amazon Basin, Brazil",
          open_time: "05:00",
          close_time: "17:00",
          photos: "/uploads/photo8.jpg",
        },
        {
          title: "Cultural Heritage in Rome",
          description: "Exploring ancient ruins",
          location_id: 3,
          user_id: 4,
          categories_id: 1,
          address: "Colosseum, Rome",
          open_time: "08:00",
          close_time: "20:00",
          photos: "/uploads/photo9.jpg",
        },
        {
          title: "The Great Wall",
          description: "History and views",
          location_id: 4,
          user_id: 5,
          categories_id: 2,
          address: "Beijing, China",
          open_time: "07:00",
          close_time: "19:00",
          photos: "/uploads/photo10.jpg",
        },
      ];

      const newBlogs = await Blog.bulkCreate(mockBlogs);
      console.log("Blogs inserted successfully:", newBlogs);
      return res
        .status(201)
        .json({ message: "Blogs inserted successfully", blogs: newBlogs });
    } catch (err) {
      console.error("Error inserting blogs:", err);
      return res.status(500).json({ error: "Error inserting blogs" });
    }
  },
};

export default blogController;
