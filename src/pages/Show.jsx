import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import Comments from "../components/Comments/Comments";
import "./Update.css";

const Show = (props) => {
  const [count, setCount] = useState(0);
  const [tweet, setTweet] = useState(null);
  const [editForm, setEditForm] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `https://backend-twitter2.herokuapp.com/tweets/${id}`;

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  // DISPLAYS TWEET/:ID
  const getTweet = async () => {
    try {
      const response = await fetch(URL);
      const foundTweet = await response.json();
      setTweet(foundTweet);
      setEditForm(foundTweet);
    } catch (err) {
      console.log(err);
    }
  };

  // UPDATE
  const updatedTweet = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      };
      const response = await fetch(URL, options);
      const updatedTweet = await response.json();
      setTweet(updatedTweet);

      // REFRESH PAGE
      navigate(0);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };

  // DELETE
  const removeTweet = async (e) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(URL, options);

      // REDIRECTS TO HOME PAGE
      navigate("/");
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };

  // INITIATES UPON MOUNT
  useEffect(() => {
    getTweet();
  }, []);

  // DISPLAYS UPDATE FORM & TWEET:ID
  const loaded = () => {
    return (
      <div className="showHTML">
        <section >
          <div className="tweet">
            <section className="clickedTweet">
              <div className="tweetDeleteHeader">
                <img className="emptyProfile" src="https://img.icons8.com/ios-filled/512/user-male-circle.png" />
                <div className="nameAndDelete">
                  <h2 className="showName">{tweet.name}</h2>
                  <img
                    className="delete"
                    src="https://img.icons8.com/ios/512/delete-sign.png"
                    alt="delete"
                    onClick={removeTweet}
                  />
                </div>
              </div>
              <h2 className="showTweet">{tweet.title}</h2>
              <img
                className="tweetImage"
                src={tweet.image}
                alt={tweet.image}
                width={400}
              />
            </section>
          </div>
        </section>
        <section className="updateFormSection">
          <form className="updateForm" onSubmit={updatedTweet}>
            <input
              type="text"
              autoComplete="off"
              className="commentName commentInput"
              value={editForm.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
            />
            <textarea
              type="text"
              autoComplete="off"
              className="commentInput commentURL"
              value={editForm.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
              maxLength="300"
              onKeyUp={(e) => setCount(e.target.value.length)}
            />
            <input
              type="text"
              autoComplete="off"
              className="commentInput commentTweet"
              value={editForm.image}
              name="image"
              placeholder="image URL"
              onChange={handleChange}
            />
            <div className="updateFormCounter">
              <p className="tweetCharCount">{count}/300</p>
              <input className="updateButton" type="submit" value="Update" />
            </div>
          </form>
        </section>
        <h6 className="replyingTo">See All Replies</h6>
        <Comments />
      </div>
    );
  };

  // LOADING
  const loading = () => {
    return (
      <section className="loading">
        <h1>
          Loading...
          <span>
            <img
              className="spinner"
              src="https://freesvg.org/img/1544764567.png"
            />
          </span>
        </h1>
      </section>
    );
  };

  return tweet ? loaded() : loading();
};

export default Show;
