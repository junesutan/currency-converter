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
import { savePairToAirtable } from "./components/api/airtable";
const App = () => {
  const [favPairs, setFavPairs] = useState([]);

  const handleFavPair = async (pair) => {
    console.log("⭐ Saving to Airtable:", pair);
    try {
      await savePairToAirtable(pair); // send to airtable
      setFavPairs((prev) => [...prev, pair]); // update UI
      console.log("Successfully saved!");
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Converter onSavePair={savePairToAirtable} />}
          />
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
