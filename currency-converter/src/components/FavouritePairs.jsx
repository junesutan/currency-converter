import React, { useEffect, useState } from "react";
import { getSavedPairsFromAirtable } from "./api/airtable";

const FavouritePairs = ({ savedPairs = [] }) => {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function loadPairs() {
      try {
        console.log("fetching from airtable");
        const records = await getSavedPairsFromAirtable();
        console.log("airtable records:", records);
        setPairs(records);
      } catch (error) {
        console.error("failed to fetch: ", error);
      } finally {
        setLoading(false);
      }
    }
    loadPairs();
  }, []);

  if (loading) return <p>Loading saved pairs...</p>;
  if (error) return <p>Error loading pairs: {error.message}</p>;

  return (
    <div>
      <h1>Your Saved Pairs</h1>

      {pairs.length === 0 ? (
        <p>No saved pairs yet.</p>
      ) : (
        pairs
          .filter(
            (pair) =>
              pair.from &&
              pair.to &&
              pair.rate &&
              pair.from.trim() !== "" &&
              pair.to.trim() !== ""
          )

          .map((pair, idx) => {
            // safeguard against missing fields
            const from = pair.from || "N/A";
            const to = pair.to || "N/A";
            const rate = pair.rate ?? "—";

            let date = pair.datedSaved || pair.dateSaved;
            if (date) {
              try {
                const parsed = new Date(date);
                const day = parsed.getDate();
                const month = parsed.toLocaleString("en-GB", {
                  month: "short",
                });
                const year = parsed.getFullYear();
                const time = parsed.toLocaleTimeString("en-SG", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                });
                date = `${day} ${month} ${year}, ${time}`;
              } catch {
                date = date;
              }
            } else {
              date = "No date";
            }

            return (
              <div key={idx} style={{ marginBottom: "0.75rem" }}>
                <strong>{from.toUpperCase()}</strong> →{" "}
                <strong>{to.toUpperCase()}</strong> : {rate}
                <br />
                <small>Saved on: {date}</small>
              </div>
            );
          })
      )}
    </div>
  );
};
export default FavouritePairs;
