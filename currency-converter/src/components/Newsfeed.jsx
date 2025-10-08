import React, { useState, useEffect } from "react";
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

const Newsfeed = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("NEWS_API_KEY:", NEWS_API_KEY);
    async function fetchNewsfeed() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://newsapi.org/v2/everything?q=exchange rate OR forex OR currency&language =en&apiKey=${NEWS_API_KEY}`
        );
        const json = await res.json();
        setData(json.articles);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNewsfeed();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Exchange Rate News Here!</h1>
      <ul>
        {data.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Newsfeed;

// const ExchangeRateNews = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchNewsData() {
//       try {
//         setLoading(true);
//         setError(null);
//         const res = await fetch(
//           `https://newsapi.org/v2/everything?q=exchange rate OR forex OR currency&language =en&apiKey=${NEWS_API_KEY}`
//         );
//         const newsData = await res.json();
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchNewsData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div>
//       <h1>Exchange Rate News Here!</h1>
//       <ul>
//         {newsData.map((article, idx) => (
//           <li key={idx}>
//             <a href={article.url} target="_blank">
//               {article.title}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExchangeRateNews;
