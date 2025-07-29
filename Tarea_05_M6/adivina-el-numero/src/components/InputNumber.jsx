// src/components/InputNumber.jsx
import React from "react";

const InputNumber = ({ value, onChange, onGuess }) => {
  const handleInput = (e) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onGuess();
    }
  };

  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Tu número"
        min={1}
        max={100}
      />
      <button onClick={onGuess}>Adivinar</button>
    </div>
  );
};

export default InputNumber;