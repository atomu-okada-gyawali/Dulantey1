import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './BlogCard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFlag, 
  faShare, 
  faMapMarkerAlt, 
  faStar, 
  faCommentAlt,
  faEllipsisV,
  faPencilAlt,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

function BlogCard({ 
  imgSrc, 
  authorImg, 
  authorName, 
  date, 
  location, 
  title, 
  description, 
  initialRating,
  isOwnBlog,
  onUpdate,
  onDelete 
}) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");
  const [rating, setRating] = useState(initialRating);
  const [showMenu, setShowMenu] = useState(false);

  const toggleComment = () => {
    setIsCommenting(!isCommenting);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    setSubmittedComment(comment);
    setComment("");
    setIsCommenting(false);
  };

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: 'Check out this blog!',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  const handleUpdate = () => {
    onUpdate && onUpdate();
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete && onDelete();
    setShowMenu(false);
  };

  return (
    <article className={styles.blogCard}>
      <div className={styles.blogContent}>
        <img src={imgSrc} alt={title} className={styles.blogImage} />
        <div className={styles.blogDetails}>
          {isCommenting ? (
            <div className={styles.commentArea}>
              <textarea
                className={styles.commentTextarea}
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button className={styles.commentSubmitBtn} onClick={handleCommentSubmit}>
                Submit
              </button>
            </div>
          ) : (
            <>
              <div className={styles.blogHeader}>
                <div className={styles.authorInfo}>
                  <Link to="/profile">
                    <img src={authorImg} alt="Author" className={styles.authorImage} />
                  </Link>
                  <div className={styles.authorNameDate}>
                    <Link to="/profile" className={styles.authorNameLink}>
                      <h3 className={styles.authorName}>{authorName}</h3>
                    </Link>
                    <p className={styles.postDate}>{date}</p>
                  </div>
                </div>
                <div className={styles.blogActions}>
                  {isOwnBlog && (
                    <div className={styles.menuContainer}>
                      <button className={styles.menuBtn} onClick={toggleMenu}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                      {showMenu && (
                        <div className={styles.dropdownMenu}>
                          <button onClick={handleUpdate}>
                            <FontAwesomeIcon icon={faPencilAlt} /> Update
                          </button>
                          <button onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  <div className={styles.rating}>
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          className={index < rating ? styles.starFilled : styles.star}
                          onClick={() => handleRatingClick(index)}
                          style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'black', margin: '0 1px' }}
                        />
                      ))}
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <FontAwesomeIcon icon={faFlag} />
                    </button>
                    <button className={styles.actionBtn} onClick={toggleComment}>
                      <FontAwesomeIcon icon={faCommentAlt} />
                    </button>
                    <button className={styles.actionBtn} onClick={handleShareClick}>
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.blogBody}>
                <div className={styles.locationInfo}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{location}</span>
                </div>
                <h2 className={styles.blogTitle}>{title}</h2>
                <p className={styles.blogDescription}>{description}</p>
              </div>
              <a href="#" className={styles.moreLink}>
                More
              </a>
              {submittedComment && (
                <div className={styles.submittedComment}>
                  <p>{submittedComment}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
