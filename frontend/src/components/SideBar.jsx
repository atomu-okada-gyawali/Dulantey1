import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./SideBar.module.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faNewspaper, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 800);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 800);
      setIsOpen(width > 800);
    };

  
    window.addEventListener('resize', handleResize);

  
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 
  const isOnBlogsPage = true;

  return (
    <div className={styles.container}>
      {(!isOpen || isMobile) && (
        <button
          className={styles.toggleButton}
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : styles.sidebarClose}`}>
        {isMobile && (
          <button
            className={styles.closeButton}
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        <div className={styles.logoContainer}>
          <img src="src/assets/logo.jpg" alt="Dulantey" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navItem}>
            <FontAwesomeIcon icon={faHome} />
            <span className={styles.navText}>Home</span>
          </Link>
          <Link to="/blogs" className={`${styles.navItem} ${isOnBlogsPage ? styles.active : ''}`}>
            <FontAwesomeIcon icon={faNewspaper} />
            <span className={styles.navText}>Blogs</span>
          </Link>
          <Link to="/createBlog" className={styles.addBlogBtn}>
            <img src="src/assets/add.png" alt="add blog" className={styles.addIcon} />
            <span className={styles.btnText}>Add Blog</span>
          </Link>
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
