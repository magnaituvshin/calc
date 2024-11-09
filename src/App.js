import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [num1, setNum1] = useState(null); // Stores the first number
  const [operation, setOperation] = useState(''); // Stores the current operation (+, -, *, /)
  const [display, setDisplay] = useState(''); // Stores the number to display
  const [isNewInput, setIsNewInput] = useState(false); // Tracks if we're expecting new number input

  // Function to handle the actual calculation logic
  const calculate = (n1, n2, op) => {
    if (op === "+") return n1 + n2;
    if (op === "-") return n1 - n2;
    if (op === "*") return n1 * n2;
    if (op === "/") return n2 !== 0 ? n1 / n2 : "Error"; // Handle division by zero
    return n1; // Return n2 if no valid operation
  };

  // Helper function to format the result, allowing scientific notation (E-notation) if needed
  const formatResult = (result) => {
    // Convert to a number for formatting
    if (isNaN(result) || result === "Error") return result; // Handle non-numeric or error cases
    const resultNumber = Number(result);
    const absResult = Math.abs(resultNumber);

    // Use scientific notation if the number is too large or too small
    if (absResult >= 1e12 || (absResult !== 0 && absResult < 1e-6)) {
      return resultNumber.toExponential(6); // Show in scientific notation with 6 decimal places
    }

    // Otherwise, format with commas for readability
    return resultNumber.toLocaleString("en-US", { maximumFractionDigits: 6 });
  };

  // Handle digit input (0-9)
  const handleDigit = (digit) => {
    // If the input is exceeding the length, do not add more digits
    if (display.replace(/,/g, "").length >= 12 && !isNewInput) return;

    if (isNewInput) {
      setDisplay(digit.toString());
      setIsNewInput(false);
    } else {
      setDisplay(display + digit);
    }
  };

  // Handle decimal input
  const handleDecimal = () => {
    if (isNewInput) {
      setDisplay("0."); // Start a new input with '0.'
      setIsNewInput(false);
    } else if (!display.includes(".")) {
      setDisplay(display + "."); // Add a decimal point if not already present
    }
  };

  // Handle delete last digit (DEL button)
  const handleDelete = () => {
    setDisplay(display.slice(0, -1) || "0"); // Remove last character, or show '0' if empty
  };

  // Handle reset button
  const handleReset = () => {
    setDisplay("");
    setNum1(null);
    setOperation("");
    setIsNewInput(false);
  };

  // Handle operations (+, -, *, /)
  const handleOperation = (op) => {
    if (num1 === null) {
      setNum1(Number(display)); // Store the current number as num1
    } else if (!isNewInput) {
      // Calculate the result when a valid number exists
      const result = calculate(num1, Number(display), operation);
      setDisplay(formatResult(result));
      setNum1(result); // Set result as the new num1 for further operations
    }
    
    // Always update the operation
    setOperation(op);
    setIsNewInput(true); // Expect new input after an operation is pressed
  };

  // Handle '=' press
  const handleEqual = () => {
    if (num1 !== null && operation && !isNewInput) {
      // Perform calculation if both num1 and an operation exist
      const result = calculate(num1, Number(display), operation);
      setDisplay(formatResult(result));
      setNum1(result); // Use result for further calculations
      setOperation(''); // Clear the operation
      setIsNewInput(true); // Expect new input after result
    }
  };

  return (
    <div className="box">
      <div className="theme">calc</div>
      <div className="display">{display ? formatResult(display) : "0"}</div>
      <div className="buttons">
        <div className="digits">
          <button className="lol" onClick={() => handleDigit(7)}>7</button>
          <button className="lol" onClick={() => handleDigit(8)}>8</button>
          <button className="lol" onClick={() => handleDigit(9)}>9</button>
          <button className="lol" onClick={handleDelete}>DEL</button>
          <button className="lol" onClick={() => handleDigit(4)}>4</button>
          <button className="lol" onClick={() => handleDigit(5)}>5</button>
          <button className="lol" onClick={() => handleDigit(6)}>6</button>
          <button className="lol" onClick={() => handleOperation("+")}>+</button>
          <button className="lol" onClick={() => handleDigit(1)}>1</button>
          <button className="lol" onClick={() => handleDigit(2)}>2</button>
          <button className="lol" onClick={() => handleDigit(3)}>3</button>
          <button className="lol" onClick={() => handleOperation("-")}>-</button>
          <button className="lol" onClick={handleDecimal}>.</button>
          <button className="lol" onClick={() => handleDigit(0)}>0</button>
          <button className="lol" onClick={() => handleOperation("/")}>/</button>
          <button className="lol" onClick={() => handleOperation("*")}>*</button>
        </div>
        <div className="lowerPart">
          <button className="big-but" onClick={handleReset}>RESET</button>
          <button className="big-but" onClick={handleEqual}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
