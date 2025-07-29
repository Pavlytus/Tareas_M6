// src/components/RestartButton.jsx
import React from "react";

const RestartButton = ({ onRestart }) => {
  return (
    <button onClick={onRestart} style={{ marginTop: "1rem" }}>
      🔁 Reiniciar Juego
    </button>
  );
};

export default RestartButton;