import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Importing Axios
import styles from "./Profile.module.css";
import SideBar from "./SideBar";
import BlogCard from "./BlogCard";
import { API } from "../environment";

function Profile() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [tempProfileData, setTempProfileData] = useState(null); // For temporary changes
  const [userBlogs, setUserBlogs] = useState([]); // State for user blogs
  const [error, setError] = useState(null); // State for error handling

  const blogImageRef = useRef(null);
  const authorImageRef = useRef(null);
  const profileImageRef = useRef(null);

  // Fetch current user data and blogs on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from local storage
        const initresponse = await axios.get(`${API.BASE_URL}/api/auth/init`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userResponse = await axios.get(
          `${API.BASE_URL}/api/users/${initresponse.data.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData({
          id: userResponse.data.id,
          username: userResponse.data.username,
          fullName: userResponse.data.fullname,
          profileImage: userResponse.data.profile,
        }); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchBlogs = async () => {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      const initresponse = await axios.get(`${API.BASE_URL}/api/auth/init`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      try {
        const response = await axios.get(
          `${API.BASE_URL}/api/blogs/getAllBlogsSelf/${initresponse.data.data.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedBlogs = response.data.map((rawdatum) => ({
          id: rawdatum.id,
          imgSrc: rawdatum.photos,
          authorImg: rawdatum.User.profile,
          authorName: rawdatum.User.username,
          date: rawdatum.createdAt,
          location: rawdatum.location_id,
          title: rawdatum.title,
          description: rawdatum.description,
        }));

        setUserBlogs(formattedBlogs); // Update userBlogs state with formatted blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later."); // Set error message
      }
    };

    fetchUserData();
    console.log(profileData)
    fetchBlogs(); // Call fetchBlogs to get the blogs
  }, []);

  const handleUpdateBlog = (blogId) => {
    setSelectedBlog(userBlogs[blogId]);
    setIsUpdateModalOpen(true);
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBlog((prev) => ({
          ...prev,
          [type === "blog" ? "imgSrc" : "authorImg"]: reader.result,
        }));
      };
    
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    console.log("Updated blog:", selectedBlog);
    setIsUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (blogId) => {
    setSelectedBlog(userBlogs[blogId]);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting blog:", selectedBlog);
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  const handleProfileEditOpen = () => {
    setTempProfileData({ ...profileData });
    setIsProfileEditModalOpen(true);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileData((prev) => ({
          ...prev,
          profileImage: "",
          profileFile: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const updatedResponse = await axios.put(
      `${API.BASE_URL}/api/users/${profileData.id}`,
      {
        full_name: tempProfileData.fullName,
        username: tempProfileData.username,
        photo: tempProfileData.profileFile, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (updatedResponse.status !== 201 && updatedResponse.status !== 204) {
      alert("Failed to update profile");
    } else {
      setProfileData(tempProfileData);
      setIsProfileEditModalOpen(false);
      setTempProfileData(null);
    }
  };

  const handleProfileEditCancel = () => {
    setIsProfileEditModalOpen(false);
    setTempProfileData(null);
  };

  return (
    <div className={styles.main}>
      <SideBar />
      <div>
        <div className={styles.viewPro}>
          <img
            src={`${API.BASE_URL}/uploads/${profileData.profileImage}`}
            alt="Profile"
            className={styles.viewProImg}
          />

          <div className={styles.details}>
            <h2 className={styles.detailsH2}>{profileData.username}</h2>
            <p className={styles.detailsP}>{profileData.fullName}</p>
            <h4>{userBlogs.length} posts</h4> {/* Update to show number of blogs */}
          </div>

          <div className={styles.button}>
            <button
              className={styles.buttonBtn}
              onClick={handleProfileEditOpen}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className={styles.userBlogs}>
          {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
          {userBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              {...blog}
              onUpdate={() => handleUpdateBlog(index)}
              onDelete={() => handleDeleteBlog(index)}
            />
          ))}
        </div>
        {/* ... rest of the component remains unchanged ... */}
      </div>
    </div>
  );
}

export default Profile;
