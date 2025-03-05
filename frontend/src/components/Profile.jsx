import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Importing Axios
import styles from "./Profile.module.css";
import SideBar from "./SideBar";
import BlogCard from "./BlogCard";
import { API } from "../environment";
import BlogUpdateForm from "./BlogUpdateForm";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [tempProfileData, setTempProfileData] = useState(null); // For temporary changes
  const [userBlogs, setUserBlogs] = useState([]); // State for user blogs
  const [error, setError] = useState(null); // State for error handling
  const [blogIdForUpdate, setBlogIdForUpdate] = useState(null);

  const blogImageRef = useRef(null);
  const authorImageRef = useRef(null);
  const profileImageRef = useRef(null);
  const navigate = useNavigate();

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
          isOwnBlog: true,
        }));
        setUserBlogs(formattedBlogs); // Update userBlogs state with formatted blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later."); // Set error message
      }
    };

    fetchUserData();
    console.log(profileData);
    fetchBlogs(); // Call fetchBlogs to get the blogs
    console.log("UserBlogs", userBlogs);
  }, []);

  const handleUpdateBlog = (blogId) => {
    console.log("userBlogs");
    setBlogIdForUpdate(blogId);
    setIsUpdateModalOpen(true);
  };
  const handleUpdateBlogClose = () => {
    setIsUpdateModalOpen(false);
  };
  const handleDeleteProfile = async (blogId) => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        const response = await axios.delete(
          `${API.BASE_URL}/api/users/${
            JSON.parse(localStorage.getItem("currentUser")).id
          }`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Profile deleted successfully:", response.data);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.error("Error deleting Profile:", error);
        setError("Failed to delete Profile. Please try again later.");
      }
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await axios.delete(
          `${API.BASE_URL}/api/blogs/deleteBlog/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Blog deleted successfully:", response.data);
      } catch (error) {
        console.error("Error deleting blog:", error);
        setError("Failed to delete blog. Please try again later.");
      }
    }
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
          imgSrc: "",
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
            <h4>{userBlogs.length} posts</h4>{" "}
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
          {error && <p className={styles.error}>{error}</p>}{" "}
          {/* Display error message */}
          {userBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              {...blog}
              onUpdate={() => handleUpdateBlog(blog.id)}
              onDelete={() => handleDeleteBlog(blog.id)}
              isOpen={isUpdateModalOpen}
            />
          ))}
        </div>
        <BlogUpdateForm
          isOpen={isUpdateModalOpen}
          onClose={handleUpdateBlogClose}
          id={blogIdForUpdate}
        />

        {isProfileEditModalOpen && (
          <div className={styles.modalOverlay}>
            <div
              className={`${styles.modalContent} ${styles.profileEditModal}`}
            >
              <h2>Edit Profile</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className={styles.profileImageSection}>
                  <div className={styles.profileImageContainer}>
                    <img
                      src={`${API.BASE_URL}/uploads/${tempProfileData.profileImage}`}
                      alt="Profile preview"
                      className={styles.profileImagePreview}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      ref={profileImageRef}
                      style={{ display: "none" }}
                    />
                    <button
                      type="button"
                      className={styles.imageUploadBtn}
                      onClick={() => profileImageRef.current.click()}
                    >
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={tempProfileData.username}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        username: e.target.value,
                      })
                    }
                    placeholder="Enter username"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={tempProfileData.fullName}
                    onChange={(e) =>
                      setTempProfileData({
                        ...tempProfileData,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter full name"
                  />
                </div>

                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.updateBtn}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleProfileEditCancel}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteProfile}
                    className={styles.cancelBtn}
                  >
                    Delete Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
