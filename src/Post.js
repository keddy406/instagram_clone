import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./Firebase";
import firebase from "firebase";
function Post({ username, caption, imageUrl, postId, user }) {
  const [comments, setComments] = React.useState([]);
  const [comment, setComment] = React.useState("");

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  React.useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              comment: doc.data(),
            }))
          );
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <div className="post">
      {/* header->avatar+username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="https://res.cloudinary.com/dxfsqdkwg/image/upload/v1600848794/ava_d50a851ca2.jpg"
          alt="Kimi"
        />
        <h3>{username}</h3>
      </div>
      {/* image */}
      <img className="post__image" src={imageUrl} alt="" />
      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username}</strong>: {caption}
      </h4>
      <div className="post__comments">
        {comments.map(({ comment, id }) => (
          <p key={id}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
