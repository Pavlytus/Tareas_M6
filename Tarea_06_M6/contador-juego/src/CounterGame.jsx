import React, { useReducer, useRef, useCallback, useEffect, useState } from "react";

// Estado inicial
const initialState = { count: 0, history: [] };

// Reducer con acciones: increment, incrementBy, decrement, undo, reset
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
        history: [...state.history, `+1 (Nuevo valor: ${state.count + 1})`],
      };

    case "incrementBy":
      return {
        count: state.count + action.payload,
        history: [
          ...state.history,
          `+${action.payload} (Nuevo valor: ${state.count + action.payload})`,
        ],
      };

    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`],
      };

    case "undo": {
      if (state.history.length === 0) return state;

      const lastAction = state.history[state.history.length - 1];
      const updatedHistory = state.history.slice(0, -1);

      let newCount = state.count;

      const matched = lastAction.match(/([+-])(\d+)/);
      if (matched) {
        const [, sign, number] = matched;
        const value = parseInt(number);
        newCount = sign === "+" ? state.count - value : state.count + value;
      }

      return {
        count: newCount,
        history: updatedHistory,
      };
    }

    case "reset":
      return { count: 0, history: [] };

    default:
      return state;
  }
}

function CounterGame() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState(1);
  const incrementBtnRef = useRef(null);

  // Fijar el foco en el botón de incremento al montar
  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  // Cargar historial y count desde localStorage al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem("contadorHistorial");
    const savedCount = localStorage.getItem("contadorValor");

    if (savedHistory && savedCount !== null) {
      dispatch({
        type: "reset", // restablece primero
      });
      const parsedHistory = JSON.parse(savedHistory);
      const parsedCount = parseInt(savedCount);
      for (const entry of parsedHistory) {
        const matched = entry.match(/([+-])(\d+)/);
        if (matched) {
          const [, sign, number] = matched;
          const value = parseInt(number);
          dispatch({
            type: sign === "+" ? "incrementBy" : "decrement",
            payload: value,
          });
        }
      }
    }
  }, []);

  // Guardar historial y contador en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("contadorHistorial", JSON.stringify(state.history));
    localStorage.setItem("contadorValor", state.count.toString());
  }, [state]);

  // Funciones memorizadas
  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment" });
  }, []);

  const handleIncrementBy = useCallback(() => {
    dispatch({ type: "incrementBy", payload: Number(inputValue) || 0 });
  }, [inputValue]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Contador: {state.count}</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button ref={incrementBtnRef} onClick={handleIncrement}>+1</button>
        <button onClick={handleDecrement}>-1</button>
        <button onClick={handleUndo}>Deshacer</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ width: "80px", marginRight: "8px" }}
        />
        <button onClick={handleIncrementBy}>+ Incrementar por</button>
      </div>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default CounterGame;
