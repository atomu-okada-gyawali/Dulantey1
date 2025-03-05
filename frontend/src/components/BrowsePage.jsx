import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import Sidebar from "./SideBar";

import styles from "./BrowsePage.module.css";
import { API } from "../environment";

function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [profileData, setProfileData] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const initresponse = await axios.get(`${API.BASE_URL}/api/auth/init`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axios.get(
          `${API.BASE_URL}/api/blogs/getAllBlogs/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedBlogs = response.data.map((rawdatum) => {
          return{
          id: rawdatum.id,
          imgSrc: rawdatum.photos,
          authorImg: rawdatum.User.profile,
          authorName: rawdatum.User.username,
          date: rawdatum.createdAt,
          location: rawdatum.location_id,
          title: rawdatum.title,
          description: rawdatum.description,
          isOwnBlog: initresponse.data.data.id == rawdatum.User.id,
        }});

        setBlogs(formattedBlogs);
        console.log(blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later."); // Set error message
      }
    };
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const initresponse = await axios.get(`${API.BASE_URL}/api/auth/init`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(JSON.stringify(initresponse));
        const userResponse = await axios.get(
          `${API.BASE_URL}/api/users/${initresponse.data.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileData({
          username: userResponse.data.username,
          fullName: userResponse.data.fullname,
          profileImage: userResponse.data.profile,
        }); // Set profile data with response data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();

    fetchBlogs();
  }, []);

  return (
    <div className={styles.browsePage}>
      <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <Link to="/profile">
            <img
              src={`${API.BASE_URL}/uploads/${profileData.profileImage}`} // Updated to dynamic import
              alt="Profile"
              className={styles.profileImage}
            />
          </Link>
        </div>

        <div className={styles.blogsList}>
          {error && <p className={styles.error}>{error}</p>}{" "}
          {/* Display error message */}
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
