import React from 'react';
import styles from './CreateBlog.module.css';
import SideBar from './SideBar';

const CreateBlog = () => {
  return (
    <div className={styles.pageContainer}>
      <SideBar/>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>Create New Blog</h2>
          <img src="./src/assets/profile.png" alt="Profile" className={styles.profile} />
        </header>

        <div className={styles.container}>
          <form className={styles.form}>
            <div className={styles.imageUpload}>
              <img src="./src/assets/dropimage.png" alt="imgicon" />
              <div className={styles.imagePlaceholder}>
                <p>
                  Drop your image here or <a href="#">browse</a>
                </p>
              </div>
            </div>

            <div className={styles.formFields}>
              <div className={styles.inputGroup}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  className={styles.input}
                  placeholder="Once upon a time..."
                  maxLength="180"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  className={styles.textarea2}
                  placeholder="The start of a wonderful story..."
                  maxLength="180"
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.inline}`}>
                <div>
                  <label htmlFor="category" className={styles.dropdownLabel}>
                    Type
                  </label>
                  <select id="category" className={styles.dropdown}>
                    <option value="" disabled selected>
                      Select a category
                    </option>
                    <option value="food">Food</option>
                    <option value="outing">Outing</option>
                    <option value="events">Events</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className={styles.dropdownLabel}>
                    Location
                  </label>
                  <select id="location" className={styles.dropdown}>
                    <option value="" disabled selected>
                      Province 1
                    </option>
                    <option value="province2">Province 2</option>
                    <option value="province3">Province 3</option>
                    <option value="province4">Province 4</option>
                    <option value="province5">Province 5</option>
                    <option value="province6">Province 6</option>
                    <option value="province7">Province 7</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className={styles.input} placeholder="Text" />
              </div>

              <div className={`${styles.inputGroup} ${styles.openingHours}`}>
                <label>Opening Hours</label>
                <div className={styles.timeInputs}>
                  <input type="time" className={styles.timeInput} />
                  <span>to</span>
                  <input type="time" className={styles.timeInput} />
                </div>
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton}>
                  Create Blog
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
