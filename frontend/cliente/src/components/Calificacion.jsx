import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';


import styles from "./styles.module.scss";
import movie from "./movie.module.scss";

const CalificacionPage = () => {
  const { id } = useParams();
  const [calificacion, setCalificacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const [movies, setMovies] = useState(null); 
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const [mensaje, setMensaje] = useState('');

  const obtenerComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/calificacion/comentario/${id}`);
      setComentarios(response.data.calificaciones);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/peliculas/movies/${id}`) // Agregué el ID en la URL
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => setError(error));
      obtenerComentarios();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // Si el usuario no está autenticado, puedes manejarlo de alguna manera
      setMensaje("Quieres calificar? Inicia sesión para hacerlo");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/calificacion/calificar/${id}`,
        {
          calificacion,
          comentario,
          peliculaId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Respuesta del servidor:', response.data);
      obtenerComentarios();
      window.location.href = `/welcome/${localStorage.getItem('userId')}`;
    
    } catch (error) {
      console.error('Error al enviar la calificación:', error);
    }
  };

  const onChange = (e) => {
    setCalificacion(e.target.value);
  };

  return (
    <div className={movie.calificar}>
      <h1>Calificar Película</h1>
      {movies && (
        <>
          <h2>{movies.nombre}</h2>
          <img src={movies.image.url} alt={movies.nombre} />
          <h2>Sinopsis:</h2>
          <h2>{movies.sinopsis}</h2>
          <h2>Calificacion: {movies.calificacionPelicula}</h2>
          {isAuthenticated ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className={styles.menu}>
                  <div className={styles.left}>
                    <label htmlFor='calificacion'>Calificacion </label>
                    <select
                      value={calificacion}
                      onChange={(e) => onChange(e)}
                      id='calificacion'
                      name='calificacion'
                    >
                      <option value=''>Selecciona una opcion</option>
                      <option value='Muy Mala'>Muy Mala</option>
                      <option value='Mala'>Mala</option>
                      <option value='Regular'>Regular</option>
                      <option value='Buena'>Buena</option>
                      <option value='Muy Buena'>Muy Buena</option>
                    </select>
                  </div>
                </div>
                <br />
                <label>
                  
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                  />
                </label>
                <br />
                <button type="submit">Enviar Calificación</button>
              </form>
              {/* Muestra el mensaje si existe */}
              {mensaje && <p>{mensaje}</p>}
            </>
          ) : (
            <p>
              Quieres calificar?{' '}
              <Link to="/login">Inicia sesión</Link> para hacerlo.
            </p>
          )}
          <div className={movie.calificar}>
            <h2>Comentarios:</h2>
            {comentarios && comentarios.map((comentario) => (
              <div key={comentario._id}>
                <p>{comentario.usuario}: {comentario.texto}</p>
              </div>
            ))}

          </div>
        </>
      )}
    </div>
  );
};


export default CalificacionPage;
