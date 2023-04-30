import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "../modules/home/Home";
import Exercise1 from "../modules/pages/exercise1/exercise1";
import Exercise2 from "../modules/pages/exercise2/exercise2";

const RoutesApp = () => {
    return (
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="exercise1" element={ <Exercise1 /> } />
        <Route path="exercise2" element={ <Exercise2 /> } />
      </Routes>
    )
}

export default RoutesApp;