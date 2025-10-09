import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

//importing components
import Navbar from "./components/Navbar";
import Converter from "./components/Converter";
import ExchangeRateTrend from "./components/ExchangeRateTrend";
import FavouritePairs from "./components/FavouritePairs";
import Newsfeed from "./components/Newsfeed";

const App = () => {
  const [favPairs, setFavPairs] = useState([]);

  const handleFavPair = (pair) => {
    setFavPairs((prev) => [...prev, pair]);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Converter onSavePair={handleFavPair} />} />
          <Route
            path="/favourite-pairs"
            element={<FavouritePairs savedPairs={favPairs} />}
          />
          <Route path="/exchange-rate-trend" element={<ExchangeRateTrend />} />
          <Route path="/newsfeed" element={<Newsfeed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
