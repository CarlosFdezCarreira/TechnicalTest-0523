import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">TECHNICAL TEST</h1>
      <div className="links">
        <Link className="" to={"/exercise1"}>
          {" /exercise1 "}
        </Link>
        <Link to={"/exercise2"}>{" /exercise2 "}</Link>
      </div>
    </div>
  );
};

export default Home;
