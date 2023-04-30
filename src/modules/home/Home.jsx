import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h1>TECHNICAL TEST</h1>
            <p>
                Go to 
                <Link to={"/exercise1"}>{" /exercise1 "}</Link> 
                or 
                <Link to={"/exercise2"}>{" /exercise2 "}</Link> 
                to see the results of my technical test
            </p>
        </div>
    )
}

export default Home;