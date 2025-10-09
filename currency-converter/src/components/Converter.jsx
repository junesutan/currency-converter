import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { savePairToAirtable } from "./api/airtable";

const APIKEY = import.meta.env.VITE_API_KEY;

const Converter = ({ onSavePair }) => {
  //receives a prop pass from App.jsx to save pairs

  const [leftCurrency, setLeftCurrency] = useState("sgd"); //tracks currency
  const [rightCurrency, setRightCurrency] = useState("usd");

  const [leftValue, setLeftValue] = useState("1.00"); //tracks amount
  const [rightValue, setRightValue] = useState("");

  const [rate, setRate] = useState(null); //store exchange rate fetched from API
  const [message, setMessage] = useState(""); //feedback message to user

  //HANDLE FAV PAIRS
  const handleSave = () => {
    if (!rate || isNaN(rate)) {
      //check if exchange rate is falsy (false, 0, "", null, undefined) before saving
      setMessage("Cannot save — exchange rate is not ready yet!");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    if (
      !leftValue ||
      parseFloat(leftValue) === 0 ||
      !rightValue ||
      parseFloat(rightValue) === 0
    ) {
      setMessage("Please enter a value before saving!");
      setTimeout(() => setMessage(""), 2500);
      return;
    }

    const now = new Date(); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    const formattedDate = now.toLocaleString("en-SG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const newPair = {
      from: leftCurrency,
      to: rightCurrency,
      rate: parseFloat(rate.toFixed(4)),
      dateSaved: formattedDate,
    };

    if (onSavePair) onSavePair(newPair);

    savePairToAirtable(newPair);

    setMessage(
      `Saved ${leftCurrency.toUpperCase()} → ${rightCurrency.toUpperCase()}`
    );
    setTimeout(() => setMessage(""), 2500);
  };

  //FUNCTION TO HANDLE SWAP
  const handleSwap = () => {
    setLeftCurrency(rightCurrency);
    setRightCurrency(leftCurrency);
    setLeftValue(rightValue);
    setRightValue(leftValue);
  };

  //FETCH DATA USING EXCHANGE RATE API
  useEffect(() => {
    console.log(APIKEY);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.exchangerate.host/convert?access_key=${APIKEY}&from=${leftCurrency}&to=${rightCurrency}&amount=1`
        );
        console.log(
          `https://api.exchangerate.host/convert?access_key=${APIKEY}from=${leftCurrency}&to=${rightCurrency}&amount=1`
        );
        const data = await res.json();
        if (data.success) {
          console.log(data);
          setRate(data.result);
          setRightValue((parseFloat(leftValue) * data.result).toFixed(4));
        }

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
    }, 800);

    return () => clearTimeout(timeoutId); // 🧹 clean up on rerender
  }, [leftCurrency, rightCurrency]);

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

  if (!leftCurrency || !rightCurrency) return null;

  return (
    <div className="converter">
      <h1 className="converter-title">Compare Currency Instantly!</h1>
      <div className="converter-container">
        {/* LEFT CARD */}
        <div className="converter-card">
          <select
            className="dropdown-selection"
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
          <div className="input-box">
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

        <div className="swap">
          {/* SWAP BUTTON */}
          <button onClick={handleSwap} className="swap-btn">
            ⇄
          </button>
        </div>
        {/* RIGHT CARD */}
        <div className="converter-card">
          <select
            className="dropdown-selection"
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
          <div className="input-box">
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
      <div className="save-btn">
        <button onClick={handleSave}>Save Pair as Favourite!</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Converter;
