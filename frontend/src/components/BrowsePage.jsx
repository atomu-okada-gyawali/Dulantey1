import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import Sidebar from './SideBar';
<<<<<<< HEAD
import styles from './BrowsePage.module.css'; 
=======

import styles from './BrowsePage.module.css'; // Importing the CSS module

>>>>>>> c23ca70913919cd35b6b995fbd3c12412b8f4082
function BrowsePage() {
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
    <div className={styles.browsePage}>
      <Sidebar />
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
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
