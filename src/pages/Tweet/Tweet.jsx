import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import './Tweet.css'
const Tweet= (props)=>
{
  const [tweet, setTweet] = useState([]);
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    title: "",
  });
  // API URL
  const BASE_URL= "http://localhost:4000/tweet";
  // Use tweet function to call in useEffect
  const getTweet= async()=>
  {
    try
    {
      const res= await fetch(BASE_URL)
      console.log(res)
      const allTweets= await res.json()
      setTweet(allTweets)
    }catch(err)
    {
      console.log(err)
    }
  }
  // Handlers
  const handleChange= (e)=>
  {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
  };
  const handleSubmit= async(e)=>
  {
    // 0. prevent default (event object method)
    e.preventDefault()
    // 1. capturing our local state
    const currentState = {...newForm}
    // check any fields for property data types / truthy value (function call - stretch)
    try{
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentState)
        }
        // 2. specify request method , headers, Content-Type
        // 3. make fetch to BE - sending data (requestOptions)
        // 3a fetch sends the data to API - (mongo)
        const response = await fetch(BASE_URL, requestOptions);
        // 4. check our response -
        // 5. parse the data from the response into JS (from JSON)
        const createdTweet = await response.json()
        console.log(createdTweet)
        // update local state with response (json from be)
        setTweet([...tweet, createdTweet])
        // reset newForm state so that our form empties out
        setNewForm({
            name: "",
            image: "",
            title: "",
        })
    }catch(err) {
        console.log(err)
    }
  }
  // People are Loaded
  const loaded = () =>
  {
    return (
      <>
      <section className="FormBlock">
      <img src="https://img.icons8.com/color/512/test-account.png" />

        <form onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              name='name'
              placeholder="What's happening?"
              value={newForm.name}
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              value={newForm.image}
              name="image"
              placeholder="img url"
              onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="text"
              value={newForm.title}
              name="title"
              placeholder="title"
              onChange={handleChange}
            />
          </label>
          <div className="TweetButton">
            <input type="submit" value="Tweet!" />

          </div>
        </form>
      </section>
      <section className='tweet-list'>
        {tweet?.map((tweet) =>
          {
            return(
              <div key={tweet._id} className='tweet-card'>
                <Link to={`/tweet/${tweet._id}`}>
                  <h1>{tweet.name}</h1>
                </Link>
                <img src={tweet.image} alt={tweet.name}  width={200}/>
                <h3>{tweet.title}</h3>
               </div>
            );
          })
        }
      </section>
      </>
    )
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
  useEffect(()=>{getTweet()}, [])
  return (
    <section className="tweet-list">{tweet ? loaded() : loading()}</section>
  );
}
export default Tweet