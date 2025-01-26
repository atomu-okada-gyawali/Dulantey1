import React from 'react';
import styles from './Login.module.css';
import logo from '../assets/logo.jpg'; // Adjust the path as per your project structure
import image1 from '../assets/image1.jpg'; // Adjust the path as per your project structure

const Login = () => {
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

                <div className={styles.inputField}>
                    <input type="text" required />
                    <label>Email Id</label>
                </div>

                <div className={styles.inputField}>
                    <input type="password" required />
                    <label>Password</label>
                    <a href="#" className={styles.forgotPassword}>
                        Forgot your password?
                    </a>
                </div>

                <button className={styles.loginButton}>Login</button>

                <div className={styles.account}>
                    <p2 className={styles.noAccount}>
                        Don't have an account? <a href="#" className={styles.signUpLink}>Sign Up?</a>
                    </p2>
                </div>
            </div>
        </div>
    );
};

export default Login;
