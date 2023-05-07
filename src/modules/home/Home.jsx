import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">TECHNICAL_TEST</h1>
      <div className="links">
        <Link className="" to={"/exercise1"}>
          {"NORMAL MODE"}
        </Link>
        <Link to={"/exercise2"}>{"FIXED MODE"}</Link>
      </div>
    </div>
  );
};

export default Home;
