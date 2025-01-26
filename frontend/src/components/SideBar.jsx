

import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./SideBar.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faNewspaper, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.toggleButton}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </button>
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
          <button className={styles.addBlogBtn}>
            <img src="src/assets/add.png" alt="add blog" className={styles.addIcon} />
            <span className={styles.btnText}>Add Blog</span>
          </button>
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
    </div>
  );
}

export default SideBar;

