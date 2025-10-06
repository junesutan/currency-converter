import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";

//importing components
import Navbar from "./components/Navbar";
import Converter from "./components/Converter";
import ExchangeRateTrend from "./components/ExchangeRateTrend";
import FavouritePairs from "./components/FavouritePairs";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/favourite-pairs" element={<FavouritePairs />} />
          <Route path="/exchange-rate-trend" element={<ExchangeRateTrend />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
