import { Link } from 'react-router-dom';

const citas = [
  { id: '1', paciente: 'Juan Pérez', fecha: '2025-08-01', área: 'pediatría', doctor: 'Dr. López', información_adicional: 'Probable refriado' },
  { id: '2', paciente: 'Ana Gómez', fecha: '2025-08-02', área: 'odontología', doctor: 'Dra. Martínez', información_adicional: 'Revisión dental' },
];

function Citas() {
  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {citas.map((cita) => (
          <li key={cita.id}>
            <Link to={`/cita/${cita.id}`}>
              {cita.paciente} - {cita.fecha}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Citas;