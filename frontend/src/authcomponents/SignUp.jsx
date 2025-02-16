import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/immmg.jpg";
import { API } from "../../environment";


function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    try {
      setApiError("");
      const response = await axios.post(`${API.BASE_URL}/auth/registration`, 
        {
          full_name: data.fullname,
          email: data.email,
          username: data.username,
          password: data.password
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data) {
        toast.success("Registration successful");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || "Registration failed";
        toast.error(errorMessage);
        setApiError(errorMessage);
      } else if (error.request) {
        const errorMessage = "Server is not responding. Please check your connection and try again.";
        toast.error(errorMessage);
        setApiError(errorMessage);
      } else {
        const errorMessage = "An error occurred while sending the request.";
        toast.error(errorMessage);
        setApiError(errorMessage);
      }
      console.error("Registration error details:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={logo} alt="log" />
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Email Address"
            className={`${styles.textInput} ${errors.email ? styles.errorInput : ""}`}
            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className = {styles.errorMessage}> {errors.email.message}</p>}
          </div>

          <input
            type="text"
            placeholder="Full Name"
            className={`${styles.textInput} ${errors.fullname ? styles.errorInput : ""}`}
            {...register("fullname", { required: "Full Name is required" })}
            aria-invalid={errors.fullname ? "true" : "false"}
          />
          {errors.fullname && <p className = {styles.errorMessage}>{errors.fullname.message}</p>}

          <input
            type="text"
            placeholder="Username"
            className={`${styles.textInput} ${errors.username ? styles.errorInput : ""}`}
            {...register("username", { required: "Username is required" })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && <p className = {styles.errorMessage}>{errors.username.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className={`${styles.textInput} ${errors.password ? styles.errorInput : ""}`}
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className = {styles.errorMessage}>{errors.password.message}</p>}

          <button type="submit" className={styles.signupButton}>Create Account</button>
          {apiError && <p className={styles.errorMessage}>{apiError}</p>}
        </form>

        <p className={styles.noAccount}>
          Already have an account? <a href="/login" className={styles.signUpLink}>Log in</a>
        </p>
      </div>

      <div className={styles.smallDiv}>
        <p>Start your journey by  <br />one click, explore <br />beautiful world!</p>
        <img src="./src/assets/rightImg.png" alt="right" />
      </div>
      <ToastContainer /> 
    </div>
  );
}

export default SignUp;
