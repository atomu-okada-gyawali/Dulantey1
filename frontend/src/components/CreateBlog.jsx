import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import styles from "./CreateBlog.module.css";
import SideBar from "./SideBar";
import { API } from "../environment";
import useAuth from "../hooks/useAuth";

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { currentUser, loading: authLoading, error: authError } = useAuth();

  const onSubmit = async (data) => {
    if (authLoading) {
      setError("Authentication in progress. Please wait...");
      return;
    }

    if (authError) {
      setError(authError);
      return;
    }

    if (!currentUser) {
      setError("Please login to create a blog");
      return;
    }

    try {
      const blogData = {
        ...data,
        user_id: currentUser.id,
      };

      const { currentUser, error: authError } = useAuth();
      const token = localStorage.getItem("token");

      if (!token || authError) {
        setError(authError || "No authentication token found. Please login.");
        return;
      }

      const response = await axios.post(
        `${API.BASE_URL}/api/blogs/createBlog`,
        blogData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status < 500,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        reset();
        return;
      }

      setError(
        response.data?.message ||
          "Failed to create blog. Please try again later."
      );
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <SideBar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>Create New Blog</h2>
          <img
            src="./src/assets/profile.png"
            alt="Profile"
            className={styles.profile}
          />
        </header>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.imageUpload}>
              <img src="./src/assets/dropimage.png" alt="imgicon" />
              <div className={styles.imagePlaceholder}>
                <p>
                  Drop your image here or <a href="#">browse</a>
                </p>
              </div>
            </div>

            <div className={styles.formFields}>
              <div className={styles.inputGroup}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className={`${styles.input} ${
                    errors.title ? styles.errorInput : ""
                  }`}
                  placeholder="Once upon a time..."
                  maxLength="180"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <span className={styles.errorMessage}>
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  className={`${styles.textarea2} ${
                    errors.description ? styles.errorInput : ""
                  }`}
                  placeholder="The start of a wonderful story..."
                  maxLength="180"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <span className={styles.errorMessage}>
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.inline}`}>
                <div>
                  <label htmlFor="category" className={styles.dropdownLabel}>
                    Type
                  </label>
                  <select
                    id="category"
                    className={`${styles.dropdown} ${
                      errors.category ? styles.errorInput : ""
                    }`}
                    {...register("categories_id", {
                      required: "Category is required",
                    })}
                  >
                    <option value={0}>Select a category</option>
                    <option value={1}>Food</option>
                    <option value={2}>Outing</option>
                    <option value={3}>Events</option>
                  </select>
                  {errors.category && (
                    <span className={styles.errorMessage}>
                      {errors.category.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="location" className={styles.dropdownLabel}>
                    Location
                  </label>
                  <select
                    id="location"
                    className={`${styles.dropdown} ${
                      errors.location ? styles.errorInput : ""
                    }`}
                    {...register("location_id", {
                      required: "Location is required",
                    })}
                  >
                    <option value={1}>Province 1</option>
                    <option value={2}>Province 2</option>
                    <option value={3}>Province 3</option>
                    <option value={4}>Province 4</option>
                    <option value={5}>Province 5</option>
                    <option value={6}>Province 6</option>
                    <option value={7}>Province 7</option>
                  </select>
                  {errors.location && (
                    <span className={styles.errorMessage}>
                      {errors.location.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  className={`${styles.input} ${
                    errors.address ? styles.errorInput : ""
                  }`}
                  placeholder="Text"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <span className={styles.errorMessage}>
                    {errors.address.message}
                  </span>
                )}
              </div>

              <div className={`${styles.inputGroup} ${styles.openingHours}`}>
                <label>Opening Hours</label>
                <div className={styles.timeInputs}>
                  <input
                    type="time"
                    className={`${styles.timeInput} ${
                      errors.openingTime ? styles.errorInput : ""
                    }`}
                    {...register("open_time", {
                      required: "Opening time is required",
                    })}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    className={`${styles.timeInput} ${
                      errors.closingTime ? styles.errorInput : ""
                    }`}
                    {...register("close_time", {
                      required: "Closing time is required",
                    })}
                  />
                </div>
                {(errors.openingTime || errors.closingTime) && (
                  <span className={styles.errorMessage}>
                    {errors.openingTime?.message || errors.closingTime?.message}
                  </span>
                )}
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Blog"}
                </button>
                {error && <div className={styles.errorMessage}>{error}</div>}
                {success && (
                  <div className={styles.successMessage}>
                    Blog created successfully!
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
