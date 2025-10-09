import React from "react";

const FavouritePairs = ({ savedPairs = [] }) => {
  return (
    <div>
      <h1>Your Saved Pairs</h1>
      {savedPairs.length === 0 ? (
        <p>No saved pairs yet.</p>
      ) : (
        savedPairs.map((pair, idx) => (
          <div key={idx}>
            {pair.from.toUpperCase()} → {pair.to.toUpperCase()} : {pair.rate}
          </div>
        ))
      )}
    </div>
  );
};

export default FavouritePairs;
