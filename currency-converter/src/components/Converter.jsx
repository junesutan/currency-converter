import React from "react";
import { useState } from "react";
const DUMMY_EXCHANGE_RATE = 0.7742;

const Converter = () => {
  const [leftCurrency, setLeftCurrency] = useState("sgd");
  const [rightCurrency, setRightCurrency] = useState("usd");
  const [leftValue, setLeftValue] = useState("1.00");
  const [rightValue, setRightValue] = useState("");

  //   const handleChange = (event) => {
  //     setBaseValue(event.target.value);
  //   };

  //FUNCTION TO HANDLE HOW TYPING ON THE LEFT UPDATES THE TEXTBOX ON THE RIGHT
  const onLeftChange = (e) => {
    const v = e.target.value; // let v be what the user typed
    setLeftValue(v);
    console.log(`the user input ${e.target.value} ${leftCurrency}`);
    if (v !== "") {
      const value = parseFloat(v) * DUMMY_EXCHANGE_RATE;
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
      const value = parseFloat(v) * DUMMY_EXCHANGE_RATE;
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

          <p>S$1 = 0.7742USD</p>
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

          <p>$1USD = 1.291SGD</p>
        </div>
      </div>
    </>
  );
};

export default Converter;
