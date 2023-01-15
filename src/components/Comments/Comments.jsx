import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    title: "",
    image: "",
    comment: "",
  });

  const { id } = useParams();

  // HEROKU URL
  const URL = `https://backend-twitter2.herokuapp.com/tweets/${id}`;

  const getComment = async () => {
    try {
      const res = await fetch(URL);
      const tweet = await res.json();
      setComment(tweet.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  // POST
  const handleSubmit = async (e) => {
    // PREVENT DEFAULT
    e.preventDefault();
    const currentState = { ...newComment };

    // CAPTURE LOCAL STATE
    try {
      // FETCH TO BE, SENDING DATA
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };

      const commentURL = `https://backend-twitter2.herokuapp.com/comments/${id}`;

      // SEND DATA TO API
      const response = await fetch(commentURL, requestOptions);

      // PARSE DATA FROM RESPONSE INTO JS
      const createdComment = await response.json();

      // UPDATE LOCAL STATE
      setComment([...comment, createdComment]);
      setNewComment({
        name: "",
        title: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // CREATE A COMMENT
  const loaded = () => {
    return (
      <div>
        <section className="commentFormSection">
          <img
            className="emptyProfile"
            src="https://img.icons8.com/ios-filled/512/user-male-circle.png"
          />
          <form className="commentForm" onSubmit={handleSubmit} height={300}>
            <div className="commentInputFields">
              <label>
                <input
                  className="commentInput commentName"
                  autoComplete="off"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newComment.CommentName}
                  onChange={handleChange}
                />
              </label>
              <label>
                <textarea
                  className="commentInput commentTweet"
                  autoComplete="off"
                  type="text"
                  value={newComment.CommentTitle}
                  name="title"
                  placeholder="Tweet your reply"
                  maxLength="200"
                  onChange={handleChange}
                  onKeyUp={(e) => setCount(e.target.value.length)}
                />
              </label>
              <label>
                <input
                  className="commentInput commentURL"
                  autoComplete="off"
                  type="text"
                  value={newComment.CommentImage}
                  name="image"
                  placeholder="URL"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="commentButtonDiv">
              <p className="tweetCharCount">{count}/200</p>
              <input className="CommentButton" type="submit" value="Reply" />
            </div>
          </form>
        </section>
        <section className="returnSection">
          {comment?.map((comment) => {
            return (
              <div key={comment._id} className="commentDivs">
                <div className="tweet">
                  <img className="emptyProfile" src="https://img.icons8.com/ios-filled/512/user-male-circle.png" />
                  <h3 className="commentName">{comment.name}</h3>
                </div>
                <h3 className="commentListTweet">{comment.title}</h3>
                <img
                  className="tweetImage"
                  src={comment.image}
                  alt=""
                  width={200}
                />
              </div>
            );
          })}
        </section>
      </div>
    );
  };

  // LOADING
  const loading = () => (
    <section className="loading">
      <h1>
        Loading...
        <span>
          <img
            className="spinner"
            src="https://freesvg.org/img/1544764567.png"
          />{" "}
        </span>
      </h1>
    </section>
  );

  // INITIATES UPON MOUNT IF THERE IS A COMMENT
  useEffect(() => {
    getComment();
  }, [comment.length]);

  return (
    <div>
      <section>{comment ? loaded() : loading()}</section>
    </div>
  );
};

export default Comments;
