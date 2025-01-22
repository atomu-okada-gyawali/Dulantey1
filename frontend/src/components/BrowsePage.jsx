import React, { useState } from "react";
import Sidebar from "./components/SideBar"; // Import Sidebar component
import BlogCard from "./components/BlogCard"; // Import BlogCard component
import "./BrowsePage.css"; // Global styles if needed
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const blogs = [
    {
      imgSrc: "./src/assets/baudha.png",
      authorImg: "./src/assets/tracy.png",
      authorName: "Tracy Wilson",
      date: "August 20, 2022",
      location: "Kathmandu, Nepal",
      title: "Bouddha Stupa",
      description:
        "A magnificent Buddhist shrine located in the heart of Kathmandu. The stupa's golden spire and prayer flags create a serene atmosphere. Perfect spot for meditation and cultural photography.",
      initialRating: 0,
    },
    {
      imgSrc: "./src/assets/namo.png",
      authorImg: "./src/assets/tracy.png",
      authorName: "Tracy Wilson",
      date: "August 20, 2022",
      location: "Kavrepalanchowk, Nepal",
      title: "Namo Buddha",
      description:
        "An ancient Buddhist monastery with breathtaking views of the Himalayas. The peaceful environment and traditional architecture make it a perfect retreat for spiritual seekers and photography enthusiasts.",
      initialRating: 4,
    },
  ];

  return (
    <div className="app-container">
      <div className="burger" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {isSidebarOpen && (
        <div className="cross" onClick={closeSidebar}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      )}

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {isSidebarOpen && (
        <div className="overlay open" onClick={closeSidebar}></div>
      )}

      <main className="main-content">
        <div className="profile-container">
          <img
            src="./src/assets/profile.png"
            alt="Profile"
            className="profile-image"
          />
        </div>

        <div className="blogs-list">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
