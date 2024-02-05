import React, { useState, useEffect } from 'react';
import axios from 'axios';
import estilos from "./World.css";

const ApiComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        console.log("Antes de la solicitud API");
        const response = await axios.get('https://moviereview-3deb0-default-rtdb.firebaseio.com/MCUmovies.json');
        console.log("Paso de la Respuesta de la API ");

        if (response.data && typeof response.data === 'object') {
          const dataAsArray = Object.values(response.data);
          setApiData(dataAsArray);
        } else {
          setApiData([]);
        }
      } catch (error) {
        console.error('Error al obtener datos desde la API:', error);
        setError('Error al obtener datos desde la API.');
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <div className={estilos}>
      <h2>Peliculas del MCU</h2>
      <img src="https://th.bing.com/th/id/R.c8b23e8bae2d2ed380486598061bf78b?rik=Q6awz7p%2fWseKXQ&pid=ImgRaw&r=0" alt="MCU Movie" /><br />                        
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
