import { useState, useRef } from 'react';
import styles from './Profile.module.css';
import SideBar from './SideBar';

import BlogCard from './BlogCard';

function Profile() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [profileData, setProfileData] = useState({
    username: 'iamtracy74',
    fullName: 'Tracey Wilson',
    profileImage: './src/assets/tracyprofile.png'
  });
  const [tempProfileData, setTempProfileData] = useState(null); // For temporary changes
  
  const blogImageRef = useRef(null);
  const authorImageRef = useRef(null);
  const profileImageRef = useRef(null);

  const userBlogs = [
    {
      imgSrc: "./src/assets/baudha.png",
      authorImg: "./src/assets/tracyprofile.png",
      authorName: "Tracy Wilson",
      date: "August 20, 2022",
      location: "Kathmandu, Nepal",
      title: "Bouddha Stupa",
      description:
        "A magnificent Buddhist shrine located in the heart of Kathmandu. The stupa's golden spire and prayer flags create a serene atmosphere. Perfect spot for meditation and cultural photography.",
      initialRating: 4,
      isOwnBlog: true
    },
    {
      imgSrc: "./src/assets/namo.png",
      authorImg: "./src/assets/tracyprofile.png",
      authorName: "Tracy Wilson",
      date: "August 20, 2022",
      location: "Kavrepalanchowk, Nepal",
      title: "Namo Buddha",
      description:
        "An ancient Buddhist monastery with breathtaking views of the Himalayas. The peaceful environment and traditional architecture make it a perfect retreat for spiritual seekers and photography enthusiasts.",
      initialRating: 5,
      isOwnBlog: true
    },
  ];

  const handleUpdateBlog = (blogId) => {
    setSelectedBlog(userBlogs[blogId]);
    setIsUpdateModalOpen(true);
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedBlog(prev => ({
          ...prev,
          [type === 'blog' ? 'imgSrc' : 'authorImg']: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    
    console.log('Updated blog:', selectedBlog);
    setIsUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDeleteBlog = (blogId) => {
    setSelectedBlog(userBlogs[blogId]);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting blog:', selectedBlog);
    setIsDeleteModalOpen(false);
    setSelectedBlog(null);
  };

  const handleProfileEditOpen = () => {
    setTempProfileData({ ...profileData }); 
    setIsProfileEditModalOpen(true);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
   
    setProfileData(tempProfileData);
    setIsProfileEditModalOpen(false);
    setTempProfileData(null);
  };

  const handleProfileEditCancel = () => {
    setIsProfileEditModalOpen(false);
    setTempProfileData(null); 
  };

  return (
    <div className={styles.main}>
      <SideBar/>
      <div>
        <div className={styles.viewPro}>
          <img
            src={profileData.profileImage}
            alt="Profile"
            className={styles.viewProImg}
          />

          <div className={styles.details}>
            <h2 className={styles.detailsH2}>{profileData.username}</h2>
            <p className={styles.detailsP}>{profileData.fullName}</p>
            <h4>3 posts</h4>
          </div>

          <div className={styles.button}>
            <button 
              className={styles.buttonBtn}
              onClick={handleProfileEditOpen}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className={styles.userBlogs}>
          {userBlogs.map((blog, index) => (
            <BlogCard 
              key={index}
              {...blog}
              onUpdate={() => handleUpdateBlog(index)}
              onDelete={() => handleDeleteBlog(index)}
            />
          ))}
        </div>

        {isUpdateModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modalContent}>
      <h2>Update Blog</h2>
      <form onSubmit={handleUpdateSubmit}>
        {/* Blog Image Section */}
        <div className={styles.imagePreviewSection}>
          <div className={styles.formGroup}>
            <label>Blog Image:</label>
            <div className={styles.imagePreviewContainer}>
              <img
                src={selectedBlog?.imgSrc || "./src/assets/dropimage.png"}
                alt="Blog preview"
                className={styles.imagePreview}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'blog')}
                ref={blogImageRef}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className={styles.imageUploadBtn}
                onClick={() => blogImageRef.current.click()}
              >
                Change Blog Image
              </button>
            </div>
          </div>
        </div>

        {/* Title Field */}
        <div className={styles.formGroup}>
          <label>Title:</label>
          <input
            type="text"
            value={selectedBlog?.title || ''}
            onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
            placeholder="Once upon a time..."
            maxLength="180"
          />
        </div>

        {/* Description Field */}
        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea
            value={selectedBlog?.description || ''}
            onChange={(e) => setSelectedBlog({ ...selectedBlog, description: e.target.value })}
            placeholder="The start of a wonderful story..."
            maxLength="180"
          />
        </div>

        {/* Category and Location Dropdowns */}
        <div className={`${styles.formGroup} ${styles.inline}`}>
          <div>
            <label>Type:</label>
            <select
              value={selectedBlog?.category || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
              className={styles.dropdown}
            >
              <option value="" disabled>Select a category</option>
              <option value="food">Food</option>
              <option value="outing">Outing</option>
              <option value="events">Events</option>
            </select>
          </div>

          <div>
            <label>Location:</label>
            <select
              value={selectedBlog?.location || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, location: e.target.value })}
              className={styles.dropdown}
            >
              <option value="" disabled>Select a province</option>
              <option value="province1">Province 1</option>
              <option value="province2">Province 2</option>
              <option value="province3">Province 3</option>
              <option value="province4">Province 4</option>
              <option value="province5">Province 5</option>
              <option value="province6">Province 6</option>
              <option value="province7">Province 7</option>
            </select>
          </div>
        </div>

        {/* Address Field */}
        <div className={styles.formGroup}>
          <label>Address:</label>
          <input
            type="text"
            value={selectedBlog?.address || ''}
            onChange={(e) => setSelectedBlog({ ...selectedBlog, address: e.target.value })}
            placeholder="Enter address"
          />
        </div>

        {/* Opening Hours Field */}
        <div className={`${styles.formGroup} ${styles.openingHours}`}>
          <label>Opening Hours:</label>
          <div className={styles.timeInputs}>
            <input
              type="time"
              value={selectedBlog?.openingTime || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, openingTime: e.target.value })}
              className={styles.timeInput}
            />
            <span>to</span>
            <input
              type="time"
              value={selectedBlog?.closingTime || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, closingTime: e.target.value })}
              className={styles.timeInput}
            />
          </div>
        </div>

        {/* Modal Buttons */}
        <div className={styles.modalButtons}>
          <button type="submit" className={styles.updateBtn}>Update Blog</button>
          <button
            type="button"
            onClick={() => {
              setIsUpdateModalOpen(false);
              setSelectedBlog(null);
            }}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        
        {isDeleteModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${styles.deleteModal}`}>
              <h2>Delete Blog</h2>
              <div className={styles.deletePreview}>
                <img 
                  src={selectedBlog?.imgSrc} 
                  alt="Blog preview" 
                  className={styles.deleteImagePreview}
                />
                <div className={styles.deleteBlogInfo}>
                  <h3>{selectedBlog?.title}</h3>
                  <p className={styles.deleteLocation}>{selectedBlog?.location}</p>
                  <p className={styles.deleteDate}>{selectedBlog?.date}</p>
                </div>
              </div>
              
              <div className={styles.deleteWarning}>
                <svg className={styles.warningIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v5M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Are you sure you want to delete this blog? This action cannot be undone.</p>
              </div>

              <div className={styles.modalButtons}>
                <button 
                  type="button" 
                  onClick={handleConfirmDelete}
                  className={`${styles.deleteBtn} ${styles.confirmDelete}`}
                >
                  Delete Blog
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setSelectedBlog(null);
                  }}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        
        {isProfileEditModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${styles.profileEditModal}`}>
              <h2>Edit Profile</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className={styles.profileImageSection}>
                  <div className={styles.profileImageContainer}>
                    <img 
                      src={tempProfileData.profileImage} 
                      alt="Profile preview" 
                      className={styles.profileImagePreview}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      ref={profileImageRef}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className={styles.imageUploadBtn}
                      onClick={() => profileImageRef.current.click()}
                    >
                      Change Profile Picture
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Username:</label>
                  <input
                    type="text"
                    value={tempProfileData.username}
                    onChange={(e) => setTempProfileData({
                      ...tempProfileData,
                      username: e.target.value
                    })}
                    placeholder="Enter username"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Full Name:</label>
                  <input
                    type="text"
                    value={tempProfileData.fullName}
                    onChange={(e) => setTempProfileData({
                      ...tempProfileData,
                      fullName: e.target.value
                    })}
                    placeholder="Enter full name"
                  />
                </div>

                <div className={styles.modalButtons}>
                  <button type="submit" className={styles.updateBtn}>
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={handleProfileEditCancel}
                    className={styles.cancelBtn}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default Profile;
