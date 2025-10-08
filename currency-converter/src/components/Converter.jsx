import React, { useEffect } from "react";
import { useState } from "react";
const APIKEY = import.meta.env.VITE_API_KEY;
// import ExchangeRateTrend from "./components/ExchangeRateTrend";
// const DUMMY_EXCHANGE_RATE = 0.7742;

const Converter = () => {
  const [leftCurrency, setLeftCurrency] = useState("sgd");
  const [rightCurrency, setRightCurrency] = useState("usd");
  const [leftValue, setLeftValue] = useState("1.00");
  const [rightValue, setRightValue] = useState("");
  const [rate, setRate] = useState(null);

  //FETCH DATA USING EXCHANGE RATE API

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.exchangerate.host/convert?access_key=${APIKEY}from=${leftCurrency}&to=${rightCurrency}&amount=1`
        );
        const data = await res.json();
        if (data.success) {
          console.log(data);
          setRate(data.result);
          setRightValue((parseFloat(leftValue) * data.result).toFixed(4));
        }

        // const r = data?.result ?? null;
        // console.log("data", data);
        // console.log("data.result", data.result);
        // setRate(r);
        console.log(
          "rate:",
          data.result,
          "from:",
          leftCurrency,
          "to",
          rightCurrency
        );
        // console.log("the new rate set is:", rate);
      } catch (err) {
        console.error("Error fetching:", err);
        setRate(null);
      }
    }, 800); // ⏳ only fetch 800 ms after last change

    return () => clearTimeout(timeoutId); // 🧹 clean up on rerender
  }, [leftCurrency, rightCurrency]);

  //   const res = await fetch(
  //   "https://api.exchangerate.host/live?access_key=${APIKEY}&currencies=USD,EUR&source=SGD"
  // );
  //   const exchangeRateData = await res.json();
  //   console.log(exchangeRateData);
  //   useEffect(() => )

  //   const handleChange = (event) => {
  //     setBaseValue(event.target.value);
  //   };

  //FUNCTION TO HANDLE HOW TYPING ON THE LEFT UPDATES THE TEXTBOX ON THE RIGHT
  const onLeftChange = (e) => {
    const v = e.target.value; // let v be what the user typed
    setLeftValue(v);
    console.log(`the user input ${e.target.value} ${leftCurrency}`);
    if (v !== "") {
      const value = parseFloat(v) * rate;
      setRightValue(value.toFixed(5)); // show 5 decimals ? ?? ?
      console.log(
        `the right value is calculated to be: ${value} ${rightCurrency}`
      );
    } else {
      setRightValue(""); // clear right box when left is empty
    }
  };

  //FUNCTION TO HANDLE HOW TYPING ON THE *RIGHT* UPDATES THE TEXTBOX ON THE LEFT
  const onRightChange = (e) => {
    const v = e.target.value; // let v be what the user typed
    setRightValue(v);
    console.log(`the user input ${e.target.value} ${rightCurrency}`);
    if (v !== "") {
      const value = parseFloat(v) * rate;
      setLeftValue(value.toFixed(5)); // show 5 decimals ? ?? ?
      console.log(
        `the left value is calculated to be: ${value} ${rightCurrency}`
      );
    } else {
      setLeftValue(""); // clear right box when left is empty
    }
  };

  return (
    <>
      <h1>Compare Currency Instantly!</h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr" }} // creates three columns
      >
        {/* LEFT CARD */}
        <div style={{ background: "grey" }}>
          {/* <label htmlFor="currency"></label> */}
          <select
            id="currency"
            value={leftCurrency}
            onChange={(e) => {
              console.log("from currency has changed to:", e.target.value); //left dropdown
              setLeftCurrency(e.target.value);
            }}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="sgd">SGD</option>
          </select>

          {/* LEFT INPUT BOX */}
          <div>
            <input
              type="number"
              min="0"
              value={leftValue}
              onChange={onLeftChange} //left input box
            />
          </div>

          <p>
            1 {leftCurrency.toUpperCase()} = {rate ? rate.toFixed(4) : "..."}{" "}
            {rightCurrency.toUpperCase()}
          </p>
        </div>

        {/* SWAP BUTTON */}
        <div>⇄</div>

        {/* RIGHT CARD */}
        <div style={{ background: "grey" }}>
          {/* <label htmlFor="currency"></label> */}
          <select
            id="currency"
            value={rightCurrency}
            onChange={(e) => {
              setRightCurrency(e.target.value); //right dropdown
              console.log("right currency has been set to:", e.target.value);
            }} //right currency
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="sgd">SGD</option>
          </select>

          {/* RIGHT INPUT BOX */}
          <div>
            <input
              type="number"
              min="0"
              value={rightValue}
              onChange={onRightChange} //right input
            />
          </div>

          <p>
            1 {rightCurrency.toUpperCase()} ={" "}
            {rate && rate !== 0 ? (1 / rate).toFixed(4) : "..."}{" "}
            {leftCurrency.toUpperCase()}
          </p>
        </div>
      </div>
      {/* <ExchangeRateTrend /> */}
    </>
  );
};

export default Converter;
