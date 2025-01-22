


import React from 'react';
import styles from './Profile.module.css';


function Profile() {

 
  return (
    
    <div className={styles.viewPro}>
      <img
        src="./src/assets/tracyprofile.png"
        alt="Profile"
        className={styles.viewProImg}
      />

      <div className={styles.details}>
        <h2 className={styles.detailsH2}>iamtracy74</h2>
        <p className={styles.detailsP}>Tracey Wilson</p>
        <h4>3 posts</h4>
      </div>

      <div className={styles.button}>
        <button className={styles.buttonBtn}>Edit Profile</button>
      </div>
    </div>
    
  );
}

export default Profile;
