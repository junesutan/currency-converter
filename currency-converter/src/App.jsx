import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

//importing components
import Navbar from "./components/Navbar";
import Converter from "./components/Converter";
import ExchangeRateTrend from "./components/ExchangeRateTrend";
import FavouritePairs from "./components/FavouritePairs";
import ExchangeRateNews from "./components/ExchangeRateNews";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/favourite-pairs" element={<FavouritePairs />} />
          <Route path="/exchange-rate-trend" element={<ExchangeRateTrend />} />
          <Route path="/exchange-rate-news" element={<ExchangeRateNews />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
