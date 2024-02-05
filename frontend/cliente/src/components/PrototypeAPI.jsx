import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cloneObject = (originalObject, modifications = {}) => {
  return Object.assign({}, originalObject, modifications);
};

const transformAPIResponse = (response) => {
  if (response.data && typeof response.data === 'object') {
    const clonedData = cloneObject(response.data);

    return Object.values(clonedData);
  }
  return [];
};

const fetchDataFromAPI = async () => {
  try {
    console.log("Antes de la solicitud API");
    const response = await axios.get('https://moviereview-3deb0-default-rtdb.firebaseio.com/MCUmovies.json');
    console.log("Paso de la Respuesta de la API ");
    return transformAPIResponse(response);
  } catch (error) {
    console.error('Error al obtener datos desde la API:', error);
    throw error;
  }
};

const ApiComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataFromAPI();
        setApiData(data);
      } catch (error) {
        setError('Error al obtener datos desde la API.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Datos de la API</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {apiData.map((movie, index) => (
          <li key={index}>
            <strong>Nombre:</strong> {movie.nombre}<br />
            <img src={movie.imagen} alt={movie.nombre} /><br />            
            <strong>Año de Lanzamiento:</strong> {movie.anioLanzamiento}<br />
            <strong>Director:</strong> {movie.director}<br />
            <strong>Genero:</strong> {movie.genero}<br />
            <strong>Rating:</strong> {movie.rating}<br />
            <strong>Sinopsis:</strong> {movie.sinopsis}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiComponent;
