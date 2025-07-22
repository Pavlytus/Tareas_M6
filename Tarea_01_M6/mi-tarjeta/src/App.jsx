import { useState } from 'react';
import Tarjeta from './Tarjeta';

function App() {
  // Estados para manejar los datos del formulario
  const [nombre, setNombre] = useState('');
  const [profesion, setProfesion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMostrarTarjeta(true); // Cuando se envía el formulario, mostramos la tarjeta
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tarjeta de Presentación</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>Nombre: </label>
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Profesión: </label>
          <input 
            type="text" 
            value={profesion} 
            onChange={(e) => setProfesion(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Mensaje: </label>
          <input 
            type="text" 
            value={mensaje} 
            onChange={(e) => setMensaje(e.target.value)} 
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Crear Tarjeta</button>
      </form>

      {/* Renderizamos la tarjeta solo si se envió el formulario */}
      {mostrarTarjeta && (
        <Tarjeta nombre={nombre} profesion={profesion} mensaje={mensaje} />
      )}
    </div>
  );
}

export default App;