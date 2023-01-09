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

  const [count, setCount] = useState(0);


  const loaded = () => {
    return (
      <div>          

        <section className="commentFormSection">
                      {/* <img src="https://img.icons8.com/color/512/test-account.png" /> */}

          <form className="commentForm" onSubmit={handleSubmit}>
            {/* <h6>Replying to</h6> */}
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
                  onKeyUp={e => setCount(e.target.value.length)}
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
