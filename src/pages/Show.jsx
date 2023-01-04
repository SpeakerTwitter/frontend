import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
 
const placeholderImage = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
 
const Show = (props) => {
   // local state (Show)
   const [tweet, setTweet] = useState(null)
   const [loading, setLoading] = useState(true)
   // access information about the current url path for browser
 
   const { id } = useParams()
   const navigate = useNavigate()
   // define some local variables
   const URL = `http://localhost:4000/tweet/${id}`
 
   const getTweet = async () => {
       try {
           const response = await fetch(URL)
           const result = await response.json()
           console.log(result)
           setTweet(result)
           setLoading(false)
       } catch (err) {
           console.log(err)
       }
   }
   // make a fetch
   const removeTweet = async (e) => {
    try {

        // configure our delete request
        const options = {
            method: "DELETE"
        }
        const response = await fetch(URL, options)
        const deletedTweet = await response.json()

        // make a fetch (delete)
        console.log(deletedTweet)
        // await response / parse response
        // navigate() -> change the current page the browser is at / client side redirect
        navigate("/")
    } catch (err) {
        console.log(err)
        // stretch - populate an error on your page - when a delete fails
        // populate some state (3 seconds)
        // redirect to a 404 page (client)
    }
}

   
   const isLoading = () => (<h2>....Loading</h2>)
   const loaded = () => (
       <>
           <div className="tweet-card">
               {/* React optimization / difference */}
               <h1>{tweet.name}</h1>
               <div>
                   <p>Delete Tweet</p>
                   <button onClick={removeTweet}> X </button>
               </div>
               <img src={tweet.image || placeholderImage} />
               <h3>{tweet.title || "Not tweet given"}</h3>
           </div>
           <Link to="/">Back to Home</Link>
       </>
   )
   useEffect(() => { getTweet() }, [id,loading])
   // confirm + render JSX +++
   // console.log(`current person: ${person?._id || "no person"}`)
   return (
       <section className="ShowContainer">
 
           {loading ? isLoading() : loaded()}
 
       </section>)
}
 
export default Show
