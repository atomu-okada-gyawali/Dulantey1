import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../environment";
import axios from "axios";
import styles from "./BlogUpdateForm1.module.css"; // Import the new CSS module

function BlogUpdateForm({ isOpen, onClose, id }) {
  const { register, handleSubmit, setValue } = useForm();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [error, setError] = useState(null);
  const [blogImageFile, setBlogImageFile] = useState(null); // State for the blog image file
  const [blogImageString, setBlogImageString] = useState("");
  const getBlog = async (id) => {
    try {
      const response = await axios.get(
        `${API.BASE_URL}/api/blogs/getBlogById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data; // Return the fetched blog data
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user details.");
    }
  };

  useEffect(() => {
    if (id) {
      getBlog(id).then((data) => {
        if (data) {
          setSelectedBlog(data);
          // Set form values using react-hook-form
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("category", data.category);
          setValue("location", data.location);
          setBlogImageString(data.photo);
        }
      });
    }
  }, [id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogImageFile(file); // Update the state with the selected file
    }
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("desc", data.description);
    formData.append("location_id", data.location);
    formData.append("categories_id", data.category);

    // Append the new photo if it exists
    if (blogImageFile) {
      formData.append("photo", blogImageFile);
    }

    try {
      const updateResponse = await axios.put(
        `${API.BASE_URL}/api/blogs/updateBlog/${selectedBlog.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update successful:", updateResponse.data);
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <h2>Update Blog</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Blog Image Section */}
            <div className={styles.imagePreviewSection}>
              <div className={styles.formGroup}>
                <label>Blog Image:</label>
                <div className={styles.imagePreviewContainer}>
                  <img
                    src={
                      `${API.BASE_URL}/${selectedBlog?.imgSrc}` ||
                      "../assets/placeholder.jpg"
                    }
                    alt="Blog preview"
                    className={styles.imagePreview}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange} // Use the new image change handler
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className={styles.imageUploadBtn}
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    Change Blog Image
                  </button>
                </div>
              </div>
            </div>

            {/* Title Field */}
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                {...register("title")}
                placeholder="Once upon a time..."
                maxLength="180"
              />
            </div>

            {/* Description Field */}
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                {...register("description")}
                placeholder="The start of a wonderful story..."
                maxLength="180"
              />
            </div>

            {/* Category and Location Dropdowns */}
            <div className={`${styles.formGroup} ${styles.inline}`}>
              <div>
                <label>Type:</label>
                <select {...register("category")}>
                  <option value="1">Food</option>
                  <option value="2">Outing</option>
                  <option value="3">Events</option>
                </select>
              </div>

              <div>
                <label>Location:</label>
                <select {...register("location")}>
                  <option value="" disabled>
                    Select a province
                  </option>
                  <option value="1">Province 1</option>
                  <option value="2">Province 2</option>
                  <option value="3">Province 3</option>
                  <option value="4">Province 4</option>
                  <option value="5">Province 5</option>
                  <option value="6">Province 6</option>
                </select>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className={styles.modalButtons}>
              <button type="submit" className={styles.updateBtn}>
                Update Blog
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  setSelectedBlog(null);
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogUpdateForm;
