import React from "react";
import { useState } from "react";

const dummyExchangeRate = 0.7742;

const Converter = () => {
  const [leftCurrency, setLeftCurrency] = useState("sgd");
  const [rightCurrency, setRightCurrency] = useState("usd");

  const [leftValue, setLeftValue] = useState("1.00");
  const [rightValue, setRightValue] = useState("1.00");

  //   const handleChange = (event) => {
  //     setBaseValue(event.target.value);
  //   };

  //WRITING A FUNCTION TO HANDLE HOW TYPING ON THE LEFT UPDATES THE TEXTBOX ON THE RIGHT
  const onLeftChange = (e) => {
    const v = e.target.value;
    setLeftValue(v);
    if (rate && v !== "") {
      const value = parseFloat(v) * dummyExchangeRate;
      setRightValue(value);
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
              console.log("from currency has changed to:", e.target.value);
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
              onChange={(e) => {
                console.log("left value input:", e.target.value);
                setLeftValue(e.target.value);
              }}
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
              console.log("right currency has changed to:", e.target.value);
              setLeftCurrency(e.target.value);
            }}
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
              onChange={(e) => {
                console.log("right value input:", e.target.value);
                setRightValue(e.target.value);
              }}
            />
          </div>

          <p>$1USD = 1.291SGD</p>
        </div>
      </div>
      {/* <label htmlFor="basevalue"></label>
      <input value={baseValue} onChange={handleChange}></input> */}
    </>
  );
};

export default Converter;

/*

TODOS:
- create the two cards both on the left and right 
    - input field 
    - currency 
    - flag emoji 
- create the exchange button (onClick)

*/
