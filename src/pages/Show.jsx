import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Comments from "../components/Comments/Comments";
import "./Update.css";

const Show = (props) => {
  const [count, setCount] = useState(0);
  const [tweet, setTweet] = useState(null);
  const [editForm, setEditForm] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `http://localhost:4000/tweets/${id}`;

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

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
      console.log(updatedTweet);
      setTweet(updatedTweet);
      // setEditForm(updatedTweet);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };
  const removeTweet = async (e) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(URL, options);
      const deletedTweet = await response.json();
      navigate("/");
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };

  useEffect(() => {
    getTweet();
  }, []);

  const loaded = () => {
    return (
      <div>
        <section>
          <div className="tweet">
            <section className="clickedTweet">
              <div className="tweetDeleteHeader">
                <img src="https://img.icons8.com/ios-filled/512/user-male-circle.png" />
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
            <input
              type="text"
              autoComplete="off"
              className="commentInput commentTweet"
              value={editForm.image}
              name="image"
              placeholder="image URL"
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
              onKeyUp={(e) => setCount(e.target.value.length)}
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

  const loading = () => {
    return (
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
  };
  return tweet ? loaded() : loading();
};
export default Show;
