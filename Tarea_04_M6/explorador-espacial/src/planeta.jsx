import React, { useEffect } from 'react';

function Planeta({ nombre }) {
  useEffect(() => {
    console.log(`¡El planeta ${nombre} ha aparecido!`);
    return () => {
      console.log(`¡El planeta ${nombre} ha desaparecido!`);
    };
  }, []);

  return <div style={{ padding: '0.3rem', backgroundColor: '#333', margin: '0.5rem 0', borderRadius: '4px' }}>{nombre}</div>;
}

export default Planeta;
