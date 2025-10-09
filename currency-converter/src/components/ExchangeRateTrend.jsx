"use client";
const APIKEY = import.meta.env.VITE_API_KEY;
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
  Legend,
} from "recharts";

function ExchangeRateTrend() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [base, setBase] = useState("SGD");
  const [target, setTarget] = useState("USD");

  // const [stats, setStats] = useState({
  //   maxRate: null,
  //   minRate: null,
  //   avgRate: null,
  //   maxDate: null,
  //   minDate: null,
  // });

  useEffect(() => {
    let formattedData = [];
    const fetchHistoricalData = async () => {
      try {
        setLoading(true);
        setError(null);

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 30);

        const startDate = start.toISOString().split("T")[0];
        const endDate = end.toISOString().split("T")[0];

        const url = `https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${target}`;
        const res = await fetch(url);
        const json = await res.json();

        formattedData = Object.entries(json.rates).map(([date, rateObj]) => ({
          date,
          rate: rateObj[target.toUpperCase()],
        }));
        console.log(formattedData);
        setData(formattedData);
      } catch (err) {
        setError(err);
        console.error("error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    // const rates = formattedData.map((d) => d.rate);
    // const maxRate = Math.max(...rates);
    // const minRate = Math.min(...rates);
    // const avgRate = (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(
    //   4
    // );

    const maxDate = formattedData.find((d) => d.rate === maxRate)?.date;
    const minDate = formattedData.find((d) => d.rate === minRate)?.date;

    // setStats({ maxRate, minRate, avgRate, maxDate, minDate });
    fetchHistoricalData();
  }, [base, target]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="trend-container">
      <h1>Exchange Rate Summary</h1>
      <p className="trend-subtitle">Last 30 Days</p>

      {/* currency dropdowns */}
      <div className="currency-selectors">
        <select
          value={base}
          onChange={(e) => setBase(e.target.value)}
          className="dropdown"
        >
          <option value="SGD" disabled={target === "SGD"}>
            SGD
          </option>
          <option value="USD" disabled={target === "USD"}>
            USD
          </option>
          <option value="EUR" disabled={target === "EUR"}>
            EUR
          </option>
        </select>

        <span className="arrow">→</span>

        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="dropdown"
        >
          <option value="SGD" disabled={base === "SGD"}>
            SGD
          </option>
          <option value="USD" disabled={base === "USD"}>
            USD
          </option>
          <option value="EUR" disabled={base === "EUR"}>
            EUR
          </option>
        </select>
      </div>
      {/* <p className="trend-summary">
        Over the last 30 days, {base.toUpperCase()} reached a high of{" "}
        <strong>
          {stats.maxRate?.toFixed(4)} {target.toUpperCase()}
        </strong>{" "}
        on <strong>{stats.maxDate}</strong> and a low of{" "}
        <strong>
          {stats.minRate?.toFixed(4)} {target.toUpperCase()}
        </strong>{" "}
        on <strong>{stats.minDate}</strong>. The average exchange rate during
        this period was{" "}
        <strong>
          {stats.avgRate} {target.toUpperCase()}
        </strong>
        .
      </p> */}
      <div
        className="trend-container"
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "30px auto 0",
          height: 350,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis
              tickFormatter={(value) => value.toFixed(3)}
              tick={{ fontSize: 12 }}
              domain={["dataMin - 0.005", "dataMax + 0.005"]}
            />
            <Tooltip
              formatter={(value) => [
                `${value.toFixed(4)} ${target}`,
                "Exchange Rate",
              ]}
            />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#2c3e50"
              strokeWidth={2}
              dot={false}
              name={`${base} → ${target}`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExchangeRateTrend;
