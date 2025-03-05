import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BlogCard.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API } from "../environment";
import {
  faFlag,
  faShare,
  faMapMarkerAlt,
  faStar,
  faCommentAlt,
  faEllipsisV,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function BlogCard({
  id,
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
  onDelete,
}) {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");
  const [rating, setRating] = useState(initialRating);
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const toggleComment = () => {
    setIsCommenting(!isCommenting);
  };

  const closeComment = () => {
    setIsCommenting(false);
    setComment("");
  };

  const toggleComments = async () => {
    const token = localStorage.getItem("token"); // Assign token to a variable
    setShowComments(!showComments);
    if (!showComments) {
      // Change to check if comments are being shown
      try {
        const commentsResponse = await axios.get(
          `${API.BASE_URL}/api/comments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Correctly format the Authorization header
            },
          }
        );
        console.log(commentsResponse);
        setComments(commentsResponse.data); // Correctly set comments from the response
      } catch (error) {
        console.error("Error fetching comments:", error); // Handle errors
      }
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return; // Prevent empty comments

    const submittedComment = comment; // Store before clearing
    setSubmittedComment(submittedComment);
    setComment("");

    const token = localStorage.getItem("token");

    try {
      // Fetch user details
      const userResponse = await axios.get(`${API.BASE_URL}/api/auth/init`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = userResponse.data.data.id;

      // Post the comment
      const response = await axios.post(
        `${API.BASE_URL}/api/comments`,
        {
          blog_id: id,
          user_id: userId,
          content: submittedComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsCommenting(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

const handleRatingClick = async (index) => {
    const token = localStorage.getItem("token");
    setRating(index + 1); // Update the rating state

    try {
        const initres = await axios.get(`${API.BASE_URL}/api/auth/init`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const response = await axios.post(`${API.BASE_URL}/api/reviews/`, {  
            blog_id: id, 
            user_id: initres.data.data.id, 
            review: index + 1 
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log("Review submitted successfully:", response.data);
    } catch (error) {
        console.error("Error submitting review:", error);
    }
};
  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this blog!",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Web Share API is not supported in your browser.");
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

  const locationVals = {
    1: "Province 1",
    2: "Province 2",
    3: "Province 3",
    4: "Province 4",
    5: "Province 5",
    6: "Province 6",
  };
  const locationVal = locationVals[location.toString()];

  return (
    <article className={styles.blogCard}>

      <div className={styles.blogContent}>
        <img
          src={`${API.BASE_URL}/${imgSrc}`}
          alt={title}
          className={styles.blogImage}
        />
        <div className={styles.blogDetails}>
          {isCommenting ? (
            <div className={styles.commentArea}>
              <textarea
                className={styles.commentTextarea}
                placeholder="Write your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <div className={styles.commentButtons}>
                <button
                  className={styles.commentSubmitBtn}
                  onClick={handleCommentSubmit}
                >
                  Submit
                </button>
                <button
                  className={styles.commentCloseBtn}
                  onClick={closeComment}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {!showComments ? (
                <>
                  <div className={styles.blogHeader}>
                    <div className={styles.authorInfo}>
                      <Link to="/profile">
                        <img
                          src={`${API.BASE_URL}/uploads/${authorImg}`}
                          alt="Author"
                          className={styles.authorImage}
                        />
                      </Link>
                      <div className={styles.authorNameDate}>
                        <Link to="/profile" className={styles.authorNameLink}>
                          <h3 className={styles.authorName}>{authorName}</h3>
                        </Link>
                        <p className={styles.postDate}>{date.split("T")[0]}</p>
                      </div>
                    </div>
                    <div className={styles.blogActions}>
                      {isOwnBlog && (
                        <div className={styles.menuContainer}>
                          <button
                            className={styles.menuBtn}
                            onClick={toggleMenu}
                          >
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
                              className={
                                index < rating ? styles.starFilled : styles.star
                              }
                              onClick={() => handleRatingClick(index)}
                              style={{
                                cursor: "pointer",
                                color: index < rating ? "gold" : "black",
                                margin: "0 1px",
                              }}
                            />
                          ))}
                      </div>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn}>
                          <FontAwesomeIcon icon={faFlag} />
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={toggleComment}
                        >
                          <FontAwesomeIcon icon={faCommentAlt} />
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={handleShareClick}
                        >
                          <FontAwesomeIcon icon={faShare} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.blogBody}>
                    <div className={styles.locationInfo}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      <span>{locationVal}</span>
                    </div>
                    <h2 className={styles.blogTitle}>{title}</h2>
                    <p className={styles.blogDescription}>{description}</p>
                  </div>
                </>
              ) : (
                <div className={styles.commentsSection}>
                  <div className={styles.commentHeader}>
                    <h4>Comments</h4>
                  </div>
                  <div className={styles.commentsList}>
                    {comments.map((comment) => {
                      return (
                        <div className={styles.commentItem} key={comment.id}>
                          <img
                            src={`${API.BASE_URL}/uploads/${comment.User.profile}`}
                            alt="Commenter"
                            className={styles.commenterImage}
                          />
                          <div className={styles.commentContent}>
                            <span className={styles.commenterName}>
                              {comment.User.username}
                            </span>
                            <p className={styles.commentText}>
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className={styles.postActions}>
                <button
                  className={styles.viewCommentsBtn}
                  onClick={toggleComments}
                >
                  {showComments ? "Hide Comments" : "View Comments"}
                </button>

              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
