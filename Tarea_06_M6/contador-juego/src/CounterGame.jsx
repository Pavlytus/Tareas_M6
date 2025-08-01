import { useReducer, useRef, useEffect, useCallback, useState } from "react";

// Recuperar historial de localStorage al iniciar
const getInitialState = () => {
  const storedHistory = localStorage.getItem("counterHistory");
  return {
    count: 0,
    history: storedHistory ? JSON.parse(storedHistory) : [],
  };
};

// Reducer para manejar acciones
function reducer(state, action) {
  switch (action.type) {
    case "increment":
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
        history: [
          ...state.history,
          `-1 (Nuevo valor: ${state.count - 1})`,
        ],
      };
    case "reset":
      return { count: 0, history: [] };
    case "undo": {
      if (state.history.length === 0) return state;

      const lastEntry = state.history[state.history.length - 1];
      const valueMatch = lastEntry.match(/[+-]?\d+/);
      const lastChange = valueMatch ? parseInt(valueMatch[0]) : 0;

      return {
        count: state.count - lastChange,
        history: state.history.slice(0, -1),
      };
    }
    default:
      return state;
  }
}

export default function CounterGame() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [incrementAmount, setIncrementAmount] = useState(1);
  const incrementBtnRef = useRef(null);

  // Enfocar el botón "+" al cargar
  useEffect(() => {
    incrementBtnRef.current?.focus();
  }, []);

  // Guardar historial en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("counterHistory", JSON.stringify(state.history));
  }, [state.history]);

  // Funciones con useCallback
  const handleIncrement = useCallback(() => {
    const value = Number(incrementAmount) || 1;
    dispatch({ type: "increment", payload: value });
  }, [incrementAmount]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Contador Interactivo</h1>
      <h2>Valor actual: {state.count}</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
          style={{
            marginRight: "1rem",
            width: "60px",
            padding: "4px",
            fontSize: "1rem",
          }}
        />
        <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleUndo}>Deshacer</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <h3>Historial de cambios:</h3>
      {state.history.length === 0 ? (
        <p>No hay historial aún.</p>
      ) : (
        <ul>
          {state.history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )}
    </div>
  );
}