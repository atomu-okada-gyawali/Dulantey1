import React from "react";
import { Link } from "react-router-dom";
import one from "../assets/home-page/1.png";
import two from "../assets/home-page/2.jpg";
import three from "../assets/home-page/3.jpg";
import styles from "./Homepage.module.css";

export default function HomePage() {
  return (
    <main className={styles.mainContainer}>
      <Link to="/login" className={styles.loginButton}>
        Login
      </Link>

      <section className={styles.mainContent}>
        <aside className={styles.asideContent}>
          <h1 className={styles.heading}>
            Welcome to <span>Dulantey!</span>
          </h1>
          <p className={styles.description}>
            Explore, connect, and uncover the magic of Kathmandu with local
            insights and guided adventures. Whether you&apos;re seeking iconic
            landmarks or looking for unique local experiences, Dulantey connects
            you with trusted guides and curated travel tips to make your journey
            unforgettable.
          </p>
        </aside>
        <section className={styles.imageContainer}>
          <section className={styles.imageSection}>
            <img src={one} alt="Travel image 1" />
            <img src={two} alt="Travel image 2" />
          </section>
          <section className={styles.singleImage}>
            <img src={three} alt="Travel image 3" />
          </section>
        </section>
      </section>
    </main>
  );
}
