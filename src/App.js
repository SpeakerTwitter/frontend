import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TweetContainer from "./containers/TweetContainer";
import React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/tweet" element={<TweetContainer />} />
      </Routes>
    </div>
  );
}

export default App;
