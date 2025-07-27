import React, { useState, useEffect, useMemo, useRef } from 'react';
import Planeta from './Planeta';

function App() {
  // Estado de vuelo
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave, setEstadoNave] = useState("En órbita");
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Estado de bitácora
  const [bitacoraPlanetas, setBitacoraPlanetas] = useState(() => {
    const data = localStorage.getItem("bitacoraPlanetas");
    return data ? JSON.parse(data) : [];
  });

  const [seleccionado, setSeleccionado] = useState(null); // planeta seleccionado para ver detalles o editar
  const [modoEdicion, setModoEdicion] = useState(false);

  // Refs del formulario
  const nombreRef = useRef();
  const descripcionRef = useRef();
  const imagenRef = useRef();

  // Simulación de vuelo
  useEffect(() => {
    console.log("¡El panel de control está listo!");

    const intervalo = setInterval(() => {
      setDistancia(prev => prev + 10);
      setCombustible(prev => Math.max(prev - 5, 0));
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel de control se ha apagado.");
    };
  }, []);

  useEffect(() => {
    console.log("¡Combustible actualizado!");
  }, [combustible]);

  useEffect(() => {
    localStorage.setItem("bitacoraPlanetas", JSON.stringify(bitacoraPlanetas));
  }, [bitacoraPlanetas]);

  const mensajeEstado = useMemo(() => {
    return `Estado actual de la nave: ${estadoNave}`;
  }, [estadoNave]);

  const aterrizar = () => {
    setEstadoNave("Aterrizando");
    const nuevoPlaneta = `Planeta ${planetasVisitados.length + 1}`;
    setPlanetasVisitados(prev => [...prev, nuevoPlaneta]);
  };

  const registrarPlaneta = (e) => {
    e.preventDefault();

    const nombre = nombreRef.current.value.trim();
    const descripcion = descripcionRef.current.value.trim();
    const imagenFile = imagenRef.current.files[0];

    if (!nombre || !descripcion) return;

    const lector = new FileReader();

    lector.onloadend = () => {
      const nuevaEntrada = {
        id: modoEdicion && seleccionado ? seleccionado.id : Date.now(),
        nombre,
        descripcion,
        imagen: imagenFile ? lector.result : null
      };

      if (modoEdicion && seleccionado) {
        setBitacoraPlanetas(prev =>
          prev.map(p => (p.id === seleccionado.id ? nuevaEntrada : p))
        );
        setModoEdicion(false);
        setSeleccionado(null);
      } else {
        setBitacoraPlanetas(prev => [...prev, nuevaEntrada]);
      }

      e.target.reset();
    };

    if (imagenFile) {
      lector.readAsDataURL(imagenFile);
    } else {
      lector.onloadend(); // llamar manualmente si no hay imagen
    }
  };

  const eliminarPlaneta = (id) => {
    setBitacoraPlanetas(prev => prev.filter(p => p.id !== id));
    if (seleccionado?.id === id) setSeleccionado(null);
  };

  const editarPlaneta = (planeta) => {
    setSeleccionado(planeta);
    setModoEdicion(true);

    nombreRef.current.value = planeta.nombre;
    descripcionRef.current.value = planeta.descripcion;
  };

  return (
    <div style={styles.panel}>
      <h1>🛰️ Panel de Control Espacial</h1>
      <p>📏 Distancia: {distancia} km</p>
      <p>⛽ Combustible: {combustible}%</p>
      <p>🛸 {mensajeEstado}</p>

      <button onClick={aterrizar} style={styles.boton}>🌍 Aterrizar</button>

      <h2>📝 Registrar Planeta</h2>
      <form onSubmit={registrarPlaneta} style={styles.form}>
        <input type="text" ref={nombreRef} placeholder="Nombre del planeta" required />
        <textarea ref={descripcionRef} placeholder="Descripción" required />
        <input type="file" ref={imagenRef} accept="image/*" />
        <button type="submit">{modoEdicion ? "Guardar cambios" : "Registrar planeta"}</button>
      </form>

      <h2>📚 Bitácora de Planetas</h2>
      {bitacoraPlanetas.length === 0 ? (
        <p>No hay planetas registrados.</p>
      ) : (
        bitacoraPlanetas.map(planeta => (
          <div key={planeta.id} style={styles.card}>
            <h3>{planeta.nombre}</h3>
            <button onClick={() => setSeleccionado(planeta)}>👁 Ver</button>
            <button onClick={() => editarPlaneta(planeta)}>✏️ Editar</button>
            <button onClick={() => eliminarPlaneta(planeta.id)}>🗑️ Eliminar</button>
          </div>
        ))
      )}

      {seleccionado && (
        <div style={styles.detalles}>
          <h2>🪐 Detalles de {seleccionado.nombre}</h2>
          <p>{seleccionado.descripcion}</p>
          {seleccionado.imagen && <img src={seleccionado.imagen} alt={seleccionado.nombre} style={styles.imagen} />}
          <button onClick={() => setSeleccionado(null)}>❌ Cerrar</button>
        </div>
      )}

      <h2>🛸 Planetas Visitados</h2>
      {planetasVisitados.map((nombre, i) => (
        <Planeta key={i} nombre={nombre} />
      ))}
    </div>
  );
}

const styles = {
  panel: {
    fontFamily: 'sans-serif',
    color: '#fff',
    background: '#12122d',
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
    borderRadius: '10px'
  },
  boton: {
    margin: '1rem 0',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  card: {
    background: '#1e1e40',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px'
  },
  detalles: {
    background: '#262654',
    padding: '1rem',
    marginTop: '1rem',
    borderRadius: '6px'
  },
  imagen: {
    maxWidth: '100%',
    marginTop: '0.5rem',
    borderRadius: '6px'
  }
};

export default App;
