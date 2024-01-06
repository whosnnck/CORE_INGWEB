import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reporte = () => {
  const [conteoPorCategoria, setConteoPorCategoria] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/peliculas/reporteVotos')
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        setConteoPorCategoria(response.data);
      })
      .catch(error => console.error('Error al obtener conteo:', error));
  }, []);

  return (
    <div>
      <h1>Reporte de Votos</h1>

      <div>
        {Object.entries(conteoPorCategoria).map(([categoria, votosPorRol]) => (
          <div key={categoria}>
            <h2>{categoria}</h2>
            <ul>
              {Object.entries(votosPorRol).map(([rol, cantidad]) => (
                <li key={rol}>
                  {rol}: {cantidad} voto{cantidad !== 1 && 's'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reporte;
