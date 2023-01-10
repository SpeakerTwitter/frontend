import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comments = (props) => {
  const [count, setCount] = useState(0);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    title: "",
    image: "",
    comment: "",
  });

  const { id } = useParams();

  const URL = `http://localhost:4000/tweets/${id}`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentState = { ...newComment };
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      const commentURL = `http://localhost:4000/comments/${id}`;

      const response = await fetch(commentURL, requestOptions);
      console.log(response);
      const createdComment = await response.json();
      console.log(createdComment);
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


  const loaded = () => {
    return (
      <div>
        <section className="commentFormSection">
          <form className="commentForm" onSubmit={handleSubmit}>
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
            <p>{count}</p>

            <div className="commentButtonDiv">
              <input className="CommentButton" type="submit" value="Reply" />
            </div>
          </form>
        </section>
        <section className="returnSection">
          {comment?.map((comment) => {
            return (
              <div className="commentDivs" key={comment._id}>
                <div className="tweet">
                  <img src="https://img.icons8.com/color/512/test-account.png" />
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
