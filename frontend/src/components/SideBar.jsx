


import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from './Sidebar.module.css'; // Updated to import the module.css
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ isOpen }) {
  const navigate = useNavigate(); 
  const handleAddBlogClick = () => {
    navigate('/createBlog'); 
  };

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logoContainer}>
        <img src="src/assets/logo.jpg" alt="Dulantey" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faHome} />
          <span className={styles.navText}>Home</span>
        </a>
        <a href="#" className={styles.navItem}>
          <FontAwesomeIcon icon={faNewspaper} />
          <span className={styles.navText}>Blogs</span>
        </a>

        <div className={styles.btn}>
          <button className={styles.addBlogBtn} onClick={handleAddBlogClick}>
            <img src="src/assets/add.png" alt="add blog" className={styles.addIcon} />
            <span className={styles.btnText}>Add Blog</span>
          </button>
        </div>

        <div className={styles.categorySelect}>
          <select className={styles.categoryDropdown}>
            <option>Select a category</option>
            <option>Food</option>
            <option>Outing</option>
            <option>Events</option>
          </select>
        </div>
      </nav>
      <div className={styles.logoutBtnContainer}>
        <button className={styles.logoutBtn}>
          <img src="src/assets/logout.png" alt="logout" className={styles.logoutIcon} />
          <span className={styles.btnText}>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
