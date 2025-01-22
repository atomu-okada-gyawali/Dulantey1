// import React from 'react';
// import './CreateBlog.css';


// const CreateBlog = () => {
//   return (
//     <div>
//       {/* Header Section */}
//       <header className="header">
//         <img src="./src/assets/logo.jpg" alt="Dulantey Logo" className="logo" />
//         <img src="./src/assets/profile.png" alt="Profile" className="profile" />
//       </header>

//       {/* Main Container */}
//       <div className="container">
//         <form className="form">
//           {/* Image Upload Section */}
//           <div className="image-upload">
//             <img src="./src/assets/dropimage.png" alt="imgicon" />
//             <div className="image-placeholder">
//               <p>
//                 Drop your image here or <a href="#">browse</a>
//               </p>
//             </div>
//           </div>

//           {/* Form Fields Section */}
//           <div className="form-fields">
//             {/* Title Input */}
//             <div className="input-group">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 className="input"
//                 placeholder="Once upon a time..."
//                 maxLength="180"
//               />
//             </div>

//             {/* Description Input */}
//             <div className="input-group">
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 id="description"
//                 className="textarea2"
//                 placeholder="The start of a wonderful story..."
//                 maxLength="180"
//               />
//             </div>

//             {/* Dropdowns for Type and Location */}
//             <div className="input-group inline">
//               <div>
//                 <label htmlFor="category" className="dropdown-label">
//                   Type
//                 </label>
//                 <select id="category" className="dropdown">
//                   <option value="" disabled selected>
//                     Select a category
//                   </option>
//                   <option value="food">Food</option>
//                   <option value="outing">Outing</option>
//                   <option value="events">Events</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="location" className="dropdown-label">
//                   Location
//                 </label>
//                 <select id="location" className="dropdown">
//                   <option value="" disabled selected>
//                     Province 1
//                   </option>
//                   <option value="province2">Province 2</option>
//                   <option value="province3">Province 3</option>
//                   <option value="province4">Province 4</option>
//                   <option value="province5">Province 5</option>
//                   <option value="province6">Province 6</option>
//                   <option value="province7">Province 7</option>
//                 </select>
//               </div>
//             </div>

//             {/* Address Input */}
//             <div className="input-group">
//               <label htmlFor="address">Address</label>
//               <input type="text" id="address" className="input" placeholder="Text" />
//             </div>

//             {/* Opening Hours Section */}
//             <div className="input-group opening-hours">
//               <label>Opening Hours</label>
//               <div className="time-inputs">
//                 <input type="time" className="time-input" />
//                 <span>to</span>
//                 <input type="time" className="time-input" />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="post">
//             <button type="submit" className="button">
//               Post
//             </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateBlog;

import React from 'react';
import styles from './CreateBlog.module.css';

const CreateBlog = () => {
  return (
    <div>
      
      <header className={styles.header}>
        <img src="./src/assets/logo.jpg" alt="Dulantey Logo" className={styles.logo} />
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

          
            <div className={styles.post}>
              <button type="submit" className={styles.button}>
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

