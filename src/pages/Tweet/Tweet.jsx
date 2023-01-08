import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tweet.css";
import "./Tweet-List.css";

const Tweet = (props) => {
  const [tweet, setTweet] = useState([]);
  const [textAreaCount, settextAreaCount] = useState(0);
  const [newForm, setNewForm] = useState({
    name: "",
    title: "",
    image: "",
  });
  // API URL
  const BASE_URL = "http://localhost:4000/tweets";
  // Use tweet function to call in useEffect
  const getTweet = async () => {
    try {
      const res = await fetch(BASE_URL);
      console.log(res);
      const allTweets = await res.json();
      setTweet(allTweets);
    } catch (err) {
      console.log(err);
    }
  };
  // Handlers
  const handleChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // 0. prevent default (event object method)
    e.preventDefault();

    // 1. capturing our local state
    const currentState = { ...newForm };
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
      const createdTweet = await response.json();
      console.log(createdTweet);
      // update local state with response (json from be)
      setTweet([...tweet, createdTweet]);
      // reset newForm state so that our form empties out
      setNewForm({
        name: "",
        title: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  // const recalculate = (e) => {
  //   let textAreaCount = settextAreaCount(e.target.value.length);
  //   console.log(textAreaCount);
  // };

  const loaded = () => {
    return (
      <div className="home">
        <section className="FormBlock">
          <form className="form" onSubmit={handleSubmit}>
            <label className="tweet">
              <img
                className="emptyProfile"
                src="https://img.icons8.com/color/512/test-account.png"
              />
              <input
                className="person"
                autoComplete="off"
                type="text"
                name="name"
                placeholder="Name"
                value={newForm.name}
                onChange={handleChange}
              />
            </label>
            <label>
              <textarea
                onChange={handleChange}
                className="TheTweet"
                autoComplete="off"
                type="text"
                value={newForm.title}
                name="title"
                placeholder="What's happening?"
                // maxLength="200"
              />
            </label>
            <label>
              <input
                className="image"
                autoComplete="off"
                type="text"
                value={newForm.image}
                name="image"
                placeholder="URL"
                onChange={handleChange}
              />
            </label>
            <div className="buttonDiv">
              <p> {`Count: ${textAreaCount}`} </p>
              <input className="TweetButton" type="submit" value="Tweet" />
            </div>

          </form>            
        </section>
              <h6 className="seeTweets">Show All Tweets</h6>

        <section className="tweetCardList">
          {tweet?.map((tweet) => {
            return (
              <div key={tweet._id} className="tweet-card">
                <div className="tweet">
                  <img
                    className="emptyProfile"
                    src="https://img.icons8.com/color/512/test-account.png"
                  />
                  <Link to={`/tweet/${tweet._id}`}>
                    <h1 className="person">{tweet.name}</h1>
                  </Link>
                </div>

                <h3 className="tweetTitle">{tweet.title}</h3>
                <img
                  className="tweetImage"
                  src={tweet.image}
                  alt=""
                  width={200}
                />
                <p>Time: {tweet.createdAt}</p>
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
    getTweet();
  }, []);
  return (
    <section className="tweet-list">{tweet ? loaded() : loading()}</section>
  );
};
export default Tweet;