import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './Login.module.css';
import logo from '../assets/logo.jpg'; 
import image1 from '../assets/image1.jpg'; 

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        
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
                <p>Don't just imagine paradise, <br />Experience it!</p>
                <p2 className={styles.p2}>We'll help you plan your dream escape</p2>

                <p3 className={styles.p3}>Login</p3>

    <form onSubmit={handleSubmit(onSubmit)}>
    
    <div className={styles.inputField}>
        <input 
            type="text" 
            className={`${errors.email ? styles.errorInput : ''}`} 
            {...register("email", { 
                required: "Email is required", 
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } 
            })} 
        />
        <label>Email Id</label>
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
    </div>

    {/* Password Field */}
    <div className={styles.inputField}>
        <input 
            type="password" 
            className={`${errors.password ? styles.errorInput : ''}`} 
            {...register("password", { 
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: { 
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/, 
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character" 
                }
              })} 
        />
        <label>Password</label>
        <a href="#" className={styles.forgotPassword}>
            Forgot your password?
        </a>
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
    </div>

    <button type="submit" className={styles.loginButton}>Login</button>

    <div className={styles.account}>
        <p2 className={styles.noAccount}>
            Don't have an account? <a href="#" className={styles.signUpLink}>Sign Up?</a>
        </p2>
    </div>
</form>

            </div>
        </div>
    );
};

export default Login;






