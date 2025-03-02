import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import Sidebar from "./SideBar";

import styles from "./BrowsePage.module.css";
import { API } from "../environment";
function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogcount, setBlogCount] = useState(-1);

  const [blogs, setBlogs] = useState([]);

  const loadMoreBlogs = () => {
    setBlogCount((prevCount) => prevCount + 5); // Increment blogcount by 5
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBlogs = async () => {
      try {
        console.log(`${API.BASE_URL}/api/blogs/get5Blogs/${blogcount}`)
        const response = await axios.get(
          `${API.BASE_URL}/api/blogs/get5Blogs/${blogcount}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedBlogs = response.data.map((rawdatum) => ({
          imgSrc: rawdatum.photos,
          authorImg: rawdatum.User.profile,
          authorName: rawdatum.User.username,
          date: rawdatum.createdAt,
          location: rawdatum.location_id,
          title: rawdatum.title,
          description: rawdatum.description,
        }));
        setBlogs((prevBlogs) => [...prevBlogs, ...formattedBlogs]); // Append new blogs to existing state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [blogcount]);

  return (
    <div className={styles.browsePage}>
      <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <Link to="/profile">
            <img
              src="./src/assets/tracyprofile.png"
              alt="Profile"
              className={styles.profileImage}
            />
          </Link>
        </div>

        <div className={styles.blogsList}>
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}

          <button className={styles.loadMoreButton} onClick={loadMoreBlogs}>
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
