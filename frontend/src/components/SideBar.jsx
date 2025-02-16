import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./SideBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function SideBar({ hideCategory }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 800);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 800);
      setIsOpen(width > 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const { pathname } = useLocation();

  return (
    <div>
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
        <aside
          className={`${styles.sidebar} ${
            isOpen ? styles.sidebarOpen : styles.sidebarClose
          }`}
        >
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
            <img
              src="src/assets/logo.jpg"
              alt="Dulantey"
              className={styles.logo}
            />
          </div>
          <nav className={styles.nav}>
            <Link
              to="/"
              className={`${styles.navItem} ${
                pathname === "/" ? styles.active : ""
              }`}
            >
              <FontAwesomeIcon icon={faHome} />
              <span className={styles.navText}>Home</span>
            </Link>
            <Link
              to="/blogs"
              className={`${styles.navItem} ${
                pathname.includes("blogs") ? styles.active : ""
              }`}
            >
              <FontAwesomeIcon icon={faNewspaper} />
              <span className={styles.navText}>Blogs</span>
            </Link>
            <Link
              to="/createBlog"
              className={`${styles.navItem} ${
                pathname.includes("createBlog")
                  ? `${styles.active} ${styles.addBlogBtn}`
                  : styles.addBlogBtn
              }`}
              // className={styles.addBlogBtn}
            >
              <img
                src="src/assets/add.png"
                alt="add blog"
                className={styles.addIcon}
              />
              <span className={styles.btnText}>Add Blog</span>
            </Link>
            {/* Render the category section only if hideCategory is false */}
          </nav>
          <div className={styles.logoutBtnContainer}>
            <button className={styles.logoutBtn}>
              <img
                src="src/assets/logout.png"
                alt="logout"
                className={styles.logoutIcon}
              />
              <span className={styles.btnText}>Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
SideBar.propTypes = {
  hideCategory: PropTypes.bool.isRequired,
};

export default SideBar;
