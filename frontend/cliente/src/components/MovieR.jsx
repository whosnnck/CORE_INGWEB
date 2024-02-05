import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import movie from "./movie.module.scss";

const MovieR = () => {
    const [movies, setMovies] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/peliculas/search?q=${searchTerm}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error al buscar películas:', error);
        }
      };
  
      if (searchTerm.trim() !== '') {
        fetchSearchResults();
      } else {
        setSearchResults([]); // Limpiar resultados si el término de búsqueda está vacío
      }
    }, [searchTerm]);
      

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/peliculas/movies')
            .then((response ) => setMovies(response.data))
            .catch((error) => setError(error));
        }
    ,[]);

    useEffect(() => {
        const userId = localStorage.getItem('userId'); 
        if (userId) {
            axios
                .get(`http://localhost:4000/api/usuarios/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((response) => setUser(response))
                .catch((error) => setError(error));
        }
    }, []);
        
    const peliculasFiltradas = tipoSeleccionado === 'Todos'
    ? movies
    : movies.filter(movie => movie.tipo === tipoSeleccionado);


    return (
      <div>
        <div className={`${movie.welcome} ${movie.buttons}`}>
          <p>
            <h1>EcuMovie</h1>
          </p>
          <p>
            <h1>TOP PELICULAS ECUATORIANAS</h1>
          </p>
          <p>
          <button onClick={() => navigate("/worldmovies")}>Peliculas del</button>
            <button onClick={() => navigate("/login")}>Inicia sesión</button>
          </p>
        </div>
        <div className={movie.reader}>

        <select onChange={(e) => setTipoSeleccionado(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Accion">Acción</option>
            <option value="Comedia">Comedia</option>
            <option value="Drama">Drama</option>
            <option value="Ciencia Ficcion">Ciencia Ficción</option>
            <option value="Fantasia">Fantasía</option>
          </select>

          {peliculasFiltradas.map((movie) => {
            return (
              <div key={movie.id}>
                <img
                  className={movie.img}
                  src={movie.image.url}
                  alt="Película"
                />
                <Link to={`/movies/${movie._id}`}>
                  <h3>{movie.nombre}</h3>
                </Link>
                <h3>{movie.productor}</h3>
                <h3>{movie.director}</h3>
                <h3>{movie.clasificacion}</h3>
                <h3>{movie.tipo}</h3>
                <b>
                  <h1>Calificacion : {movie.calificacionPelicula}</h1>
                </b>
              </div>
            );
            
          })}
          
        </div>
      </div>
    );
};

export default MovieR;