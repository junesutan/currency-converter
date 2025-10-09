import React, { useEffect, useState } from "react";
import { getSavedPairsFromAirtable } from "./api/airtable";

const FavouritePairs = ({ savedPairs = [] }) => {
  const [pairs, setPairs] = useState([]);

  useEffect(() => {
    async function loadPairs() {
      try {
        console.log("fetching from airtable");
        const records = await getSavedPairsFromAirtable();
        console.log("airtable records:", records);
        setPairs(records);
      } catch (error) {
        console.error("failed to fetch: ", error);
      }
    }
    loadPairs();
  }, []);

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
