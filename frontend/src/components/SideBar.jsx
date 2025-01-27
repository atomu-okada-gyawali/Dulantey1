import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
// import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons';
function Sidebar({ isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo-container">
        <img src="src/assets/logo.jpg" alt="Dulantey" className="logo" />
      </div>
      <nav className="nav">
        <a href="#" className="nav-item">
          <FontAwesomeIcon icon={faHome} />
          <span className="nav-text">Home</span>
        </a>
        <a href="#" className="nav-item">
          <FontAwesomeIcon icon = {faNewspaper} />
          <span className="nav-text">Blogs</span>
        </a>
        <button className="add-blog-btn">
          <img src="src/assets/add.png" alt="add blog" className="add-icon" />
          <span className="btn-text">Add Blog</span>
        </button>
        <div className="category-select">
          <select className="category-dropdown">
            <option>Select a category</option>
            <option>Food</option>
            <option>Outing</option>
            <option>Events</option>
          </select>
        </div>
      </nav>
      <div className="logout-btn-container">
        <button className="logout-btn">
          <img src="src/assets/logout.png" alt="logout" className="logout-icon" />
          <span className="btn-text">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
