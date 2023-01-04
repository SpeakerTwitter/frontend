//having this file allows us to import many routes into one section so that App.js isn't cluttered

import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import TweetContainer from "../containers/TweetContainer";
import React from "react";

export default (
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/tweet' element={<TweetContainer />} />
    </Routes>
)