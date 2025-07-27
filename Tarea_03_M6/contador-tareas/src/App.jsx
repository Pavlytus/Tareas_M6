import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; // Asegúrate de tener este archivo o crea uno

function App() {
  const [tareas, setTareas] = useState(() => {
    const dataGuardada = localStorage.getItem('tareas');
    return dataGuardada ? JSON.parse(dataGuardada) : [];
  });

  const [nuevaTarea, setNuevaTarea] = useState('');
  const [duracion, setDuracion] = useState('');
  const [filtroDuracion, setFiltroDuracion] = useState('');
  const [mostrarRecientes, setMostrarRecientes] = useState(false);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Actualizar el título del documento
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [tareas]);

  const calcularTiempoTotal = useMemo(() => {
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]);

  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        timestamp: Date.now()
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  const tareasFiltradas = useMemo(() => {
    let filtradas = [...tareas];
    if (filtroDuracion) {
      filtradas = filtradas.filter(t => t.duracion >= parseInt(filtroDuracion));
    }
    if (mostrarRecientes) {
      const hace5Min = Date.now() - 5 * 60 * 1000;
      filtradas = filtradas.filter(t => t.timestamp >= hace5Min);
    }
    return filtradas;
  }, [tareas, filtroDuracion, mostrarRecientes]);

  return (
    <div className="container">
      <h1>Contador de Tareas</h1>

      <div className="form">
        <input 
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea" 
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Duración en minutos" 
        />
        <button onClick={agregarTarea}>Agregar tarea</button>
      </div>

      <div className="filtros">
        <input 
          type="number" 
          value={filtroDuracion} 
          onChange={(e) => setFiltroDuracion(e.target.value)} 
          placeholder="Filtrar duración mínima" 
        />
        <label>
          <input 
            type="checkbox" 
            checked={mostrarRecientes} 
            onChange={() => setMostrarRecientes(!mostrarRecientes)} 
          />
          Mostrar solo tareas recientes (5 min)
        </label>
      </div>

      <h2>Tareas</h2>
      <ul>
        {tareasFiltradas.length === 0 ? (
          <p>No hay tareas que coincidan con el filtro.</p>
        ) : (
          tareasFiltradas.map((tarea, index) => (
            <li key={index}>
              <strong>{tarea.nombre}</strong>: {tarea.duracion} minutos
            </li>
          ))
        )}
      </ul>

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  );
}

export default App;
