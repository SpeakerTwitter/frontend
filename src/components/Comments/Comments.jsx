import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Comments = () => {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState({
    name: "",
    title: "",
    image: "",
  });

  // API URL
  const BASE_URL = "http://localhost:4000/comments";
  // Use comment function to call in useEffect
  const getComment = async () => {
    try {
      const res = await fetch(BASE_URL);
      //   console.log(res);
      const allComments = await res.json();
      setComment(allComments);
    } catch (err) {
      console.log(err);
    }
  };

  //Handlers
  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // 0. prevent default (event object method)
    e.preventDefault();
    // 1. capturing our local state
    const currentState = { ...newComment };
    // check any fields for property data types / truthy value (function call - stretch)
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };
      // 2. specify request method , headers, Content-Type
      // 3. make fetch to BE - sending data (requestOptions)
      // 3a fetch sends the data to API - (mongo)
      const response = await fetch(BASE_URL, requestOptions);
      // 4. check our response -
      // 5. parse the data from the response into JS (from JSON)
      const createdComment = await response.json();
      console.log(createdComment);
      // update local state with response (json from be)
      setComment([...comment, createdComment]);
      // reset newForm state so that our form empties out
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
        <section>
          <form className="commentForm" onSubmit={handleSubmit}>
            <label>
              <input
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Name"
                value={newComment.CommentName}
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                autoComplete="off"
                type="text"
                value={newComment.CommentTitle}
                name="title"
                placeholder="What's happening?"
                maxLength="55"
                onChange={handleChange}
              />
            </label>
            <label>
              <input
                autoComplete="off"
                type="text"
                value={newComment.CommentImage}
                name="image"
                placeholder="URL"
                onChange={handleChange}
              />
            </label>
            <div>
              <input type="submit" value="Comment" />
            </div>
          </form>
        </section>
        <section className="returnSection">
          {comment?.map((comment) => {
            return (
              <div className="commentDivs" key={comment._id}>
                {/* <Link to={`/tweet/${comment._id}`}>
                  <h1 className="tweetName">{tweet.name}</h1>
                </Link> */}
                <div className="tweet">
                  <img src="https://img.icons8.com/color/512/test-account.png" />
                  <h3>{comment.name}</h3>
                </div>
                <h3>{comment.title}</h3>
                <img
                  className="tweetImage"
                  src={comment.image}
                  alt=""
                  width={200}
                />
                {/* <h2>{comment.createdAt}</h2> */}
              </div>
            );
          })}
        </section>
      </div>
    );
  };

  // Loading
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
  }, []);

  return (
    <div>
      <section>{comment ? loaded() : loading()}</section>
    </div>
  );
};

export default Comments;