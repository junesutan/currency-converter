import React, { useState, useEffect } from "react";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const Newsfeed = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  //pagination

  useEffect(() => {
    console.log("NEWS_API_KEY:", NEWS_API_KEY);
    async function fetchNewsfeed() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=exchange rate OR forex OR currency&language=en&apiKey=${NEWS_API_KEY}`
        );
        const json = await res.json();
        setData(json.articles);
        console.log("data", json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNewsfeed();
  }, []);

  useEffect(() => {
    console.log("data is: ", data);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Exchange Rate News Here!</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {data.map((article, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              borderRadius: "10px",
            }}
          >
            <a href={article.url} target="_blank">
              {article.title}
            </a>
            <img
              src={article.urlToImage}
              style={{ height: "180px", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsfeed;
