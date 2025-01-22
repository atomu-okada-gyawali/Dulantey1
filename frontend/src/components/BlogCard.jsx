



import React, { useState } from "react";
import styles from './BlogCard.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faComment, faShare, faMapMarkerAlt, faStar, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

function BlogCard({ imgSrc, authorImg, authorName, date, location, title, description, initialRating }) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");
  const [rating, setRating] = useState(initialRating);

  const toggleComment = () => {
    setIsCommenting(!isCommenting);
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
                  <img src={authorImg} alt="Author" className={styles.authorImage} />
                  <div className={styles.authorNameDate}>
                    <h3 className={styles.authorName}>{authorName}</h3>
                    <p className={styles.postDate}>{date}</p>
                  </div>
                </div>
                <div className={styles.blogActions}>
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
            </>
          )}
          {submittedComment && (
            <div className={styles.submittedComment}>
              <p>{submittedComment}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default BlogCard;

