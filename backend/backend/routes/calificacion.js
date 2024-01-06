const { Router } = require('express');

// const {  } = require('../controllers/usuarios');
const { agregarCalificacion } = require('../controllers/CalificacionController')
const {obtenerComentarioPorPelicula} = require('../controllers/CalificacionController');

const router = Router();

router.post('/calificar/:id', agregarCalificacion);
router.get('/comentario/:id', obtenerComentarioPorPelicula);


module.exports = router;