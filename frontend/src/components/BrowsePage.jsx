import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import Sidebar from './SideBar';

import styles from './BrowsePage.module.css'; // Importing the CSS module

function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([
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
  ]);
  const [visibleBlogs, setVisibleBlogs] = useState(2); // State to control how many blogs are visible

  const filteredBlogs = blogs.filter((blog) => {
    return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const loadMoreBlogs = () => {
    setVisibleBlogs(blogs.length); // Show all blogs
  };

  const loadLessBlogs = () => {
    setVisibleBlogs(2); // Reset to show only two blogs
  };

  return (
    <div className={styles.browsePage}>
      <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className={styles.mainContainer}>
        <div className={styles.profileContainer}>
          <Link to="/profile">
            <img
              src="./src/assets/tracyprofile.png"
              alt="Profile"
              className={styles.profileImage}
            />
          </Link>
        </div>

        <div className={styles.blogsList}>
          {filteredBlogs.slice(0, visibleBlogs).map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
          {visibleBlogs < filteredBlogs.length && (
            <button className={styles.loadMoreButton} onClick={loadMoreBlogs}>Load More</button>
          )}
          {visibleBlogs > 2 && (
            <button className={styles.loadLessButton} onClick={loadLessBlogs}>Load Less</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
