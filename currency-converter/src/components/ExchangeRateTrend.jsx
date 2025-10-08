"use client";
import React, { useState, useEffect } from "react";
import { mockHistoricalData } from "./mockHistoricalData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MyComponent() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        //fetch historical data from API

        // const res = await fetch(
        //   "https://api.exchangerate.host/timeframe?access_key=69a1450bbd5e613bb343e5f0ed3d6bfb&source=usd&currencies=sgd&start_date=2025-09-06&end_date=2025-10-06"
        // );
        // const json = await res.json();

        // if (!json.success) {
        //   console.log("API error", json.error);
        //   return;
        // }

        // const result = await res.json();

        const result = mockHistoricalData; // storing the result as 'result'

        const formatted = Object.entries(result.quotes).map(
          //formatting the result as an array
          ([date, rateObj]) => ({
            date,
            rate: rateObj.USDSGD,
          })
        );

        setData(formatted);
        console.log(result);
        console.log(formatted);
      } catch (err) {
        setError(err);
        console.error("error fetching data", err);
        const formatted = Object.entries(mockHistoricalData.quotes).map(
          //formats object into an array of objects
          ([date, rateObj]) => ({
            date,
            rate: rateObj.USDSGD,
          })
        );
        setData(formatted);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Data:</h1>
      <div style={{ width: "300%", height: 800 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MyComponent;
