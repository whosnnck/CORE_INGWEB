const { Router } = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});


const { registroPelicula } = require('../controllers/MovieController')
const { obtenerPeliculas } = require('../controllers/MovieController')
const { obtenerPeliculaPorId } = require('../controllers/MovieController')
const { editarPelicula } = require('../controllers/MovieController');
const { eliminarPelicula } = require('../controllers/MovieController');
const { obtenerTodosLosVotos } = require ('../controllers/MovieController')

const router = Router();

//upload.single('image')

router.post('/', registroPelicula);
router.get('/movies', obtenerPeliculas);
router.get('/movies/:id', obtenerPeliculaPorId);
router.put('/edit/movies/:id', editarPelicula);
router.delete('/delete/movie/:id', eliminarPelicula);
router.get('/reporteVotos', obtenerTodosLosVotos);


module.exports = router;