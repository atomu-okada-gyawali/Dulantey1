import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/immmg.jpg";

import axios from "axios";
import { API } from "../environment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log("Submitted Data:", data);
    try {
      const response = await axios.post(`${API.BASE_URL}/api/users/registration`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("User registered successfully:", response.data);
      toast.success("Sign up successful");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error signing up")
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
            {errors.email && <p className={styles.errorMessage}> {errors.email.message}</p>}
          </div>

          <input
            type="text"
            placeholder="Full Name"
            className={`${styles.textInput} ${errors.fullname ? styles.errorInput : ""}`}
            {...register("fullname", { required: "Full Name is required" })}
            aria-invalid={errors.fullname ? "true" : "false"}
          />
          {errors.fullname && <p className={styles.errorMessage}>{errors.fullname.message}</p>}

          <input
            type="text"
            placeholder="Username"
            className={`${styles.textInput} ${errors.username ? styles.errorInput : ""}`}
            {...register("username", { required: "Username is required" })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className={`${styles.textInput} ${errors.password ? styles.errorInput : ""}`}
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

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
