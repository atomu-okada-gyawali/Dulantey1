create: async (req, res) => {
    try {
      const blogs = req.body.blogs; // Expecting an array of blog objects in req.body
  
      const newBlogs = await Blog.bulkCreate(
        blogs.map((blog) => ({
          title: blog.title,
          photos: blog.photoPath || null,
          description: blog.desc,
          location_id: blog.location_id,
          user_id: blog.user_id,
          categories_id: blog.categories_id,
          address: blog.address,
          open_time: blog.open_time,
          close_time: blog.close_time,
        }))
      );
  
      console.log("Blogs created:", newBlogs); // Log the created blogs
      return res.status(201).json(newBlogs); // Send the created blogs as a response
    } catch (err) {
      console.error("Error creating Blogs:", err.stack);
      return res.status(500).json({ error: "Error creating blogs" }); // Send error response
    }
  }