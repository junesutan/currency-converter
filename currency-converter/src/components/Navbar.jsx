import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* <img src="" alt=""></img> */}
      <ul>
        <Link to="/">Convert Currencies</Link>
        <Link to="/favourite-pairs">Favourite Pairs</Link>
        <Link to="/exchange-rate-trend">Exchange Rate Trend</Link>
        <Link to="/newsfeed">Newsfeed</Link>
      </ul>
    </div>
  );
};

export default Navbar;
