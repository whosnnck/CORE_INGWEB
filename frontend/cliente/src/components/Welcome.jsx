import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import styles from "./styles.module.scss";
import movie from "./movie.module.scss"

const Welcome = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const {id} = useParams();

  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    setUser(null);

    navigate('/login');
  };

  useEffect(() => {
    axios
        .get('http://localhost:4000/api/peliculas/movies')
        .then((response ) => {setMovies(response.data)
          const idmovie = response.data.map(movie => movie._id);
          console.log(idmovie);
        })
        .catch((error) => setError(error));
    }
  ,[]);

  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:4000/api/usuarios/users/${id}`, {
          headers: {
            token: token
          },
        })
        .then(({ data }) => setUser(data))
        .catch((error) => console.error(error));
    }
  }, [token, id]);
  
  //console.log(user);
  return (
    <div className={styles.welcome}>
        {user && user.nombre && (
        <div>
          <h1>Bienvenido, {user.nombre}, {user.rol}</h1>
          <link></link>
          {user.rol === 'Administrador' && (
            <button onClick={() => navigate('/crudadmin')}>Ir a CRUD Admin</button>
          )}
          {user.rol === 'Administrador' && (
            <p>
            <button onClick={() => navigate('/registerUser')}>Registrar usuario nuevo</button>
            </p>
          )}
        </div>
        )}
        <p>
          <button onClick={cerrarSesion}>Cerrar Sesión</button>
        </p>
    <div className={movie.reader}>
          {movies &&
            movies.map((movie) => {
              return (
                <div key={movie._id}>
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

export default Welcome;