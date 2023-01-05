import React from 'react'
import { useState, useEffect } from "react"
import { Navigate, useParams, useNavigate } from "react-router-dom"
const Show = (props) => {
    //set state for person details
    const [tweet, setTweet] = useState(null);
    const [editForm, setEditForm] = useState(tweet);
    // take in the ID parameter from router
    const { id } = useParams();
    const navigate = useNavigate();
    // person details URL for fetch
    const URL = `http://localhost:4000/tweet/${id}`;
    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }
    // function to fetch person details for useEffect
    const getTweet = async () => {
        try {
            const response = await fetch(URL);// fetch
            const foundTweet = await response.json();
            setTweet(foundTweet); // set state to person detail result
            setEditForm(foundTweet);
        } catch (err) {
            console.log(err);
        }
    }
    //Update Person
    const updatedTweet = async (e) => {
        e.preventDefault()
        // make put request to update a person
        try {
            const options = // configure put request
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editForm),
            }
            const response = await fetch(URL, options);
            const updatedTweet = await response.json();
            setTweet(updatedTweet);
            setEditForm(updatedTweet);
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    const removeTweet = async (e) => {
        try {
            const options = // configure delete request
            {
                method: "DELETE"
            }
            const response = await fetch(URL, options);
            const deletedTweet = await response.json();
            // console.log(deletedPerson);
            navigate("/")
        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    useEffect(() => { getTweet() }, []) // fetch person detail on MOUNT()
    // Person Details Loaded
    const loaded = () => {
        return (
            <div>
                <section>
                    <div className="tweet">
                        <h1>Show Page</h1>
                        <h2>{tweet.name}</h2>
                        <h2>{tweet.title}</h2>
                        <img src={tweet.image} alt={tweet.name} width={400} />
                        <div>
                            <button className="delete" onClick={removeTweet}>
                                Remove Tweet
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Edit this Tweet</h2>
                    <form onSubmit={updatedTweet}>
                        <input
                            type="text"
                            value={editForm.name}
                            name="name"
                            placeholder="name"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            value={editForm.image}
                            name="image"
                            placeholder="image URL"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            value={editForm.title}
                            name="title"
                            placeholder="title"
                            onChange={handleChange}
                        />
                        <input type="submit" value="Update Tweet" />
                    </form>
                </section>
            </div>
        )
    }
    // Loading
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
        )
    }
    return tweet ? loaded() : loading()
}
export default Show