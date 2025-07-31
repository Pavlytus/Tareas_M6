import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>404 - Página no encontrada</h2>
      <p>La ruta que intentaste no existe.</p>

      <button onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </div>
  );
}

export default NotFound;