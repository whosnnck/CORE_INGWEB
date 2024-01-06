// EditMoviePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import movies from "./movie.module.scss";

const EditMoviePage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        sinopsis: '',
        productor: '',
        director: '',
        clasificacion: '',
        tipo: '',
    });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/peliculas/movies/${id}`);
        setMovie(response.data);
        setFormData({
          nombre: response.data.nombre,
          sinopsis: response.data.sinopsis,
          productor: response.data.productor,
          director: response.data.director,
          clasificacion: response.data.clasificacion,
          tipo: response.data.tipo,
        });
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('boton presionado');
      await axios.put(`http://localhost:4000/api/peliculas/edit/movies/${id}`, formData);
      // Puedes redirigir al usuario a la página de detalles de la película después de la edición
        window.location.href = `/crudadmin`;
    } catch (error) {
      console.error('Error editando una pelicula:', error);
    }
  };

  return (
    <div className={movies.edit}>
      <h1>Edit Movie</h1>
      {movie && (
        <>
            <img src={movie.image.url} alt={movies.nombre} />
            <p>Title: {movie.nombre}</p>
            {/* Formulario para la edición */}
            <form onSubmit={handleSubmit}>
                {/* Campo de Nombre */}
                <label htmlFor="nombre">Nombre:</label>
                <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                />

                {/* Campo de Sinopsis */}
                <label htmlFor="sinopsis">Sinopsis:</label>
                <textarea
                id="sinopsis"
                name="sinopsis"
                value={formData.sinopsis}
                onChange={handleChange}
                />

                {/* Campo de Productor */}
                <label htmlFor="productor">Productor:</label>
                <input
                type="text"
                id="productor"
                name="productor"
                value={formData.productor}
                onChange={handleChange}
                />

                {/* Campo de Director */}
                <label htmlFor="director">Director:</label>
                <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                />

                {/* Campo de Clasificación */}
                <label htmlFor="clasificacion">Clasificación:</label>
                <input
                type="text"
                id="clasificacion"
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleChange}
                />

                {/* Campo de Tipo */}
                <label htmlFor="tipo">Tipo:</label>
                <input
                type="text"
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                />

                <button type="submit">Guardar Cambios</button>
                <button onClick={() => navigate('/crudadmin')}>Regresar</button>
            </form>
            </>
        )}
        </div>
  );
};

export default EditMoviePage;
