import './Tweet.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
const Tweet = (props) => {
   // define our state variable - []
   // react state
   const [tweet, setTweet] = useState([])
   const [newForm, setNewForm] = useState({
       name: "",
       image: "",
       title: "",
   })
   // fetch endpoint
   const BASE_URL = "http://localhost:4000/tweet"
 
   // create some local state for tracking people input (user) ++
   // link this state to a controlled form (people) ++
   // handlers (change ++ / submit )
   // submit event will make a post request from our current comp.
 
   const getTweet = async () => {
       try {
           const response = await fetch(BASE_URL)
           // fetch grabs the data from API - (mongo)
           const allTweets = await response.json()
           // assuming no errors - translate to JS
           // console.log(allPeople)
           setTweet(allTweets)
           // store that data (from api) in react state
       } catch (err) {
           console.log(err)
       }
   }
 
   useEffect(() => {
       getTweet()
   }, [])
   // useEffect takes two arguments -> runs function upon component mount
   // react mount ->
   return (
       <div>
           <section>
               <h2>Create a new tweet</h2>
               <form onSubmit={handleSubmit}>
                   <div>
                       <label htmlFor='name'>
                           Tweet
                           <input
                               type="text"
                               id="name"
                               name="name"
                               placeholder="What's up?"
                               value={newForm.name}
                               onChange={handleChange}
                           />
                       </label>
                   </div>
                   <div>
                       <label htmlFor='image'>
                           Image URL
                           <input
                               type="text"
                               id="image"
                               name="image"
                               placeholder="enter a person's image"
                               value={newForm.image}
                               onChange={handleChange}
                           />
                       </label>
                   </div>
                   <div>
                       <label htmlFor='title'>
                           Who's writing?
                           <input
                               type="text"
                               id="title"
                               name="title"
                               placeholder="Who's writing?"
                               value={newForm.title}
                               onChange={handleChange}
                           />
                       </label>
                       <br />
                       <input type="submit" value="Tweet this!" />
                   </div>
               </form>
           </section>
       </div >
   )
 
}
