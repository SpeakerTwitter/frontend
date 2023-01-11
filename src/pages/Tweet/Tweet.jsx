import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Tweet.css";
import "./Tweet-List.css";

const Tweet = () => {
  const [tweet, setTweet] = useState([]);
  const [count, setCount] = useState(0);
  const [newForm, setNewForm] = useState({
    name: "",
    title: "",
    image: "",
  });

  const BASE_URL = "https://backend-twitter2.herokuapp.com/tweets";

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

  const handleChange = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    // PREVENT DEFAULT
    e.preventDefault();

    // CAPTURE LOCAL STATE
    const currentState = { ...newForm };
    try {

      // FETCH TO BE, SENDING DATA
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentState),
      };

      // SEND DATA TO API
      const response = await fetch(BASE_URL, requestOptions);

      // PARSE DATA FROM RESPONSE INTO JS 
      const createdTweet = await response.json();
      
      // UPDATE LOCAL STATE
      setTweet([...tweet, createdTweet]);

      // RESET newForm STATE SO FORM EMPTIES OUT
      setNewForm({
        name: "",
        title: "",
        image: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // RETURNS CREATE A TWEET AND MAPS OVER ALL TWEETS
  const loaded = () => {
    return (
      <div className="home">
        <section className="FormBlock">
          <form className="form" onSubmit={handleSubmit}>
            <label className="tweet">
              <img
                className="emptyProfile"
                src="https://img.icons8.com/ios-filled/512/user-male-circle.png"
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
                maxLength="300"
                onKeyUp={(e) => setCount(e.target.value.length)}
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
              <p className="tweetCharCount">{count}/300</p>
              <input className="TweetButton" type="submit" value="Tweet" />
            </div>
          </form>
        </section>
        <h6 className="seeTweets">Show All Tweets</h6>
        <section className="tweetCardList" >
          {tweet?.map((tweet) => {
            return (
              <Link key={tweet._id} to={`/tweet/${tweet._id}`}>
                <div className="tweet-card">
                  <img
                    className="emptyProfile"
                    src="https://img.icons8.com/ios-filled/512/user-male-circle.png"
                  />
                  <div className="tweet"  >
                    <div className="tweetCardInfo">
                      <h1 className="tweetCardPerson">{tweet.name}</h1>

                      <h3 className="tweetCardTitle">{tweet.title}</h3>
                    </div>
                  </div>
                  <img
                    className="tweetImage"
                    src={tweet.image}
                    alt=""
                    width={200}
                  />
                </div>
              </Link>
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

  // INITIATES UPON MOUNT
  useEffect(() => {
    getTweet();
  }, []);

  return (
    <section className="tweet-list">{tweet ? loaded() : loading()}</section>
  );
};
export default Tweet;
