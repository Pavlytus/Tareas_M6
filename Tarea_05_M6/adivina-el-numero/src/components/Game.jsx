// src/components/Game.jsx
import React, { useState, useEffect } from "react";
import InputNumber from "./InputNumber";
import Message from "./Message";
import RestartButton from "./RestartButton";

const Game = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const handleInputChange = (value) => {
    setUserInput(value);
  };

  const handleGuess = () => {
    const guess = parseInt(userInput, 10);
    if (!guess || guess < 1 || guess > 100) {
      setMessage("Ingresa un número entre 1 y 100.");
      return;
    }

    setAttempts(attempts + 1);

    if (guess === targetNumber) {
      setMessage("🎉 ¡Correcto! Adivinaste el número.");
      setIsCorrect(true);
    } else if (guess < targetNumber) {
      setMessage("🔼 El número es mayor.");
    } else {
      setMessage("🔽 El número es menor.");
    }
  };

  const restartGame = () => {
    setTargetNumber(generateRandomNumber());
    setUserInput("");
    setMessage("");
    setIsCorrect(false);
    setAttempts(0);
  };

  return (
    <div className="game-container">
      <h1>Adivina el Número</h1>
      <p>Estoy pensando en un número del 1 al 100.</p>

      {!isCorrect && (
        <InputNumber
          value={userInput}
          onChange={handleInputChange}
          onGuess={handleGuess}
        />
      )}

      <Message message={message} />
      <p>Intentos: {attempts}</p>

      {isCorrect && <RestartButton onRestart={restartGame} />}
    </div>
  );
};

export default Game;