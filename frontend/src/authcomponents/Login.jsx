import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Login.module.css";
import logo from "../assets/logo.jpg";
import image1 from "../assets/image1.jpg";
import axios from "axios";
import { API } from "../environment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { callAuthInit } from "../../../backend/authUtils";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${API.BASE_URL}/api/auth/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User logged in successfully:", response.data);
      toast.success("login successful");
      localStorage.setItem("token", response.data.data.access_token);
      navigate("/browse");
      // Handle successful login, e.g., store token, redirect, etc.
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Error logging in");
      // Handle login error, e.g., show error message
    }
    try {
      callAuthInit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.box} ${styles.left}`}>
        <div className={styles.overlay}>
          <p className={`${styles.text} ${styles.top}`}>Hello Travelers</p>
          <p className={`${styles.text} ${styles.bottom}`}>
            Discover the hidden gems of Kathmandu with Dulantey. From <br />
            scenic trails to cultural landmarks, embark on unforgettable <br />
            journeys with us.
          </p>
          <img src={image1} alt="Placeholder" className={styles.boxImage} />
        </div>
      </div>
      <div className={`${styles.box} ${styles.right}`}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p>
          Don't just imagine paradise, <br />
          Experience it!
        </p>
        <p className={styles.p2}>We'll help you plan your dream escape</p>

        <p className={styles.p3}>Login</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputField}>
            <input
              type="text"
              className={`${errors.email ? styles.errorInput : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
            />
            <label>Email Id</label>
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className={styles.inputField}>
            <input
              type="password"
              className={`${errors.password ? styles.errorInput : ""}`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must be at least 5 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
                  message: "Must include letters and numbers",
                },
              })}
            />
            <label>Password</label>
            <a href="#" className={styles.forgotPassword}>
              Forgot your password?
            </a>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <div className={styles.account}>
            <p className={styles.noAccount}>
              Don't have an account?{" "}
              <Link to="/signup" className={styles.signUpLink}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
