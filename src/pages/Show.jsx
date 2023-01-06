import React from "react";
import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Comments from "../components/Comments/Comments";

const Show = (props) => {
  //set state for person details
  const [tweet, setTweet] = useState(null);
  const [editForm, setEditForm] = useState(tweet);
  // take in the ID parameter from router
  const { id } = useParams();
  const navigate = useNavigate();
  // person details URL for fetch
  const URL = `http://localhost:4000/tweets/${id}`;
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  // function to fetch person details for useEffect
  const getTweet = async () => {
    try {
      const response = await fetch(URL); // fetch
      const foundTweet = await response.json();
      setTweet(foundTweet); // set state to person detail result
      setEditForm(foundTweet);
    } catch (err) {
      console.log(err);
    }
  };
  //Update Person
  const updatedTweet = async (e) => {
    e.preventDefault();
    // make put request to update a person
    try {
      const options =
        // configure put request
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        };
      const response = await fetch(URL, options);
      const updatedTweet = await response.json();
      setTweet(updatedTweet);
      setEditForm(updatedTweet);
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  };
  const removeTweet = async (e) => {
    try {
      const options =
        // configure delete request
        {
          method: "DELETE",
        };
      const response = await fetch(URL, options);
      const deletedTweet = await response.json();
      // console.log(deletedPerson);
      navigate("/");
    } catch (err) {
      console.log(err);
      navigate(URL);
    }
  }
  useEffect(() => {
    getTweet();
  }, []); // fetch person detail on MOUNT()
  // Person Details Loaded
  const loaded = () => {
    return (
      <div>
        <section>
          <div className="tweet">
            <section className="clickedTweet">
              <div className="tweetDeleteHeader">
                <img src="https://img.icons8.com/color/512/test-account.png" />
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
                className="showImage"
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
              className="updateName"
              value={editForm.name}
              name="name"
              placeholder="name"
              onChange={handleChange}
              classN
            />
            <input
              type="text"
              className="updateImage"
              value={editForm.image}
              name="image"
              placeholder="image URL"
              onChange={handleChange}
            />
            <input
              type="text"
              className="updateTweet"
              value={editForm.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
            />
            <input type="submit" value="Update Tweet" />
          </form>
        </section>
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
