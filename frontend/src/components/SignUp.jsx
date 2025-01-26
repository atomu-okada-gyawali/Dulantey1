
import React from "react";

import styles from "./SignUp.module.css";
import logo from "../assets/immmg.jpg";






function App() {


  return (

    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={logo} alt="log" />
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Email Address"
          className={styles.textInput}
          required
        />

        <input
          type="text"
          placeholder="Full Name"
          className={styles.textInput}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className={styles.textInput}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.textInput}
          required
        />

        <button className={styles.signupButton}>Create Account</button>
        

        <p className={styles.noAccount}>
          Already have an account? <a href="#" className={styles.signUpLink}>Log in</a>
        </p>
      </div>

      <div className={styles.smallDiv}>
        <p>Start your journey by  <br />one click, explore <br />beautiful world!</p>
       <img src="./src/assets/rightImg.png" alt="right" />
        
        


      
      </div>
    </div>
    
  );
}

export default App;
