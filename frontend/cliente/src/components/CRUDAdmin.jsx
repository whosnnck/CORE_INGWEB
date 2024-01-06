import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.scss';
import { useNavigate, useParams } from "react-router-dom";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const {id} = useParams();

  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
        .get('http://localhost:4000/api/peliculas/movies')
        .then((response ) => setMovies(response.data))
        .catch((error) => setError(error));
    }
  ,[]);

  useEffect(() => {
    if (token && id) {
      axios
        .get(`http://localhost:4000/api/usuarios/users/${id}`, 
        {
          headers: 
          {
            token: token
          },
        })
        .then(({ data }) => setUser(data))
        .catch((error) => console.error(error));
    }
  }, [token, id]);

  const handleDelete = async (movieId) => {
    try {
        
        console.log('Intentando eliminar la pelicula ',{movieId});
       
      await axios.delete(`http://localhost:4000/api/peliculas/delete/movie/${movieId}`);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));

      window.location.reload();
    } catch (error) {
      console.error('Error al eliminar la película:', error);
    }
  };

  const handleEdit = async(movieId) => {
    navigate(`/edit/movies/${movieId}`);
  }

  return (
    <div className={styles.table}>
      <h1>Lista de Películas</h1>
      <p>
        <Link to={`/welcome/${localStorage.getItem('userId')}`}>Ver Peliculas</Link>
      </p>
      <Link to="/movie/create">Añadir Película</Link>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Sinopsis</th>
            <th>Productor</th>
            <th>Director</th>
            <th>Clasificación</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.nombre}</td>
                <td>{movie.sinopsis}</td>
                <td>{movie.productor}</td>
                <td>{movie.director}</td>
                <td>{movie.clasificacion}</td>
                <td>{movie.tipo}</td>
                <td>
                  <button onClick={() => handleEdit(movie._id)}>Editar</button>
                  <button onClick={() => handleDelete(movie._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
//
export default MovieList;