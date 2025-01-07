import React, { useState } from "react";
import './BlogCard.css';
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
    <article className="blog-card">
      <div className="blog-content">
        <img src={imgSrc} alt={title} className="blog-image" />
        <div className="blog-details">
          {isCommenting ? (
            <div className="comment-area">
              <textarea
                className="comment-textarea"
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button className="comment-submit-btn" onClick={handleCommentSubmit}>
                Submit
              </button>
            </div>
          ) : (
            <>
              <div className="blog-header">
                <div className="author-info">
                  <img src={authorImg} alt="Author" className="author-image" />
                  <div className="author-name-date">
                    <h3 className="author-name">{authorName}</h3>
                    <p className="post-date">{date}</p>
                  </div>
                </div>
                <div className="blog-actions">
                  <div className="rating">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <FontAwesomeIcon
                        key={index}
                        icon = {faStar}
                        className={index < rating ? "star filled" : "star"} 
                        onClick={() => handleRatingClick(index)}
                        style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'black', margin: '0 1px' }}
                      />
                      ))}
                  </div>
                  <div className="actionss">
                    <button className="action-btn flag-btn">
                      <FontAwesomeIcon icon={faFlag} />
                    </button>
                    <button className="action-btn comment-btn" onClick={toggleComment}>
                      <FontAwesomeIcon icon={faComment}/>
                    </button>
                    <button className="action-btn share-btn" onClick={handleShareClick}>
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="blog-body">
                <div className="location-info">
                  <FontAwesomeIcon icon = {faMapMarkerAlt} />
                  <span>{location}</span>
                </div>
                <h2 className="blog-title">{title}</h2>
                <p className="blog-description">{description}</p>
              </div>
              <a href="#" className="more-link">
                More
              </a>
            </>
          )}
          {submittedComment && (
            <div className="submitted-comment">
              <p>{submittedComment}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
