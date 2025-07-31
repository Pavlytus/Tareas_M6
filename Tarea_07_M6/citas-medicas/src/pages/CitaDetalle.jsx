import { useParams, useNavigate } from 'react-router-dom';

// Simulación de datos (los mismos ids deben coincidir con los de Citas.jsx)
const citas = [
  {
    id: '1',
    paciente: 'Juan Pérez',
    fecha: '2025-08-01',
    area: 'Cardiología',
    doctor: 'Dra. García',
    motivo: 'Chequeo de rutina',
  },
  {
    id: '2',
    paciente: 'Ana Gómez',
    fecha: '2025-08-02',
    area: 'Dermatología',
    doctor: 'Dr. López',
    motivo: 'Erupción en la piel',
  },
];

function CitaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar la cita correspondiente
  const cita = citas.find((c) => c.id === id);

  // Si no se encuentra, mostrar mensaje
  if (!cita) {
    return (
      <div>
        <h2>Cita no encontrada</h2>
        <button onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Detalles de la Cita</h2>
      <p><strong>ID:</strong> {cita.id}</p>
      <p><strong>Paciente:</strong> {cita.paciente}</p>
      <p><strong>Fecha:</strong> {cita.fecha}</p>
      <p><strong>Área:</strong> {cita.area}</p>
      <p><strong>Doctor:</strong> {cita.doctor}</p>
      <p><strong>Motivo:</strong> {cita.motivo}</p>

      <button onClick={() => navigate('/')}>
        Volver al inicio
      </button>
    </div>
  );
}

export default CitaDetalle;