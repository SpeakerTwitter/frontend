import './Tweet.css'
import { useState, useEffect } from 'react'
 
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
   const handleChange = (e) => {
    // console.log(newForm)
    const userInput = { ...newForm }
    userInput[e.target.name] = e.target.value
    setNewForm(userInput)
}

const handleSubmit = async (e) => {
    // 0. prevent default (event object method)
    e.preventDefault()
    // 1. capturing our local state
    const currentState = { ...newForm }
    // check any fields for property data types / truthy value (function call - stretch)
    try {
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
        const response = await fetch(BASE_URL, requestOptions)
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

    } catch (err) {
        console.log(err)
    }
}
const loaded = () => {
    return (<>
        <section className="tweet-list">
            {tweet?.map((twit) => {
                return (
                    <Link key={twit._id} to={`/tweet/${twit._id}`}>
                        <div className="tweet-card">
                            {/* React optimization / difference */}
                            <h1>{twit.name}</h1>
                            <img src={twit.image} />
                            <h3>{twit.title}</h3>
                        </div>
                    </Link>
                )
            })
            }
        </section>
    </>
    )
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
