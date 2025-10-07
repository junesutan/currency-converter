import React from "react";

const Converter = () => {
  //   const [baseValue, setBaseValue] = useState("0.00");

  //   const handleChange = (event) => {
  //     setBaseValue(event.target.value);
  //   };

  return (
    <>
      <h1>Compare Currency Instantly!</h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr" }} // creates three columns
      >
        <div style={{ background: "grey" }}>
          <p>This is the left card!</p>
        </div>

        <div>⇄</div>

        <div style={{ background: "grey" }}>
          <p>This is the right card!</p>
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
