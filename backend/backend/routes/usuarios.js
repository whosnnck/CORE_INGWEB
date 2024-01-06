
/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');

// const {  } = require('../controllers/usuarios');
const { registroUsuario } = require('../controllers/UserController')
const {obtenerUsuarios} = require('../controllers/UserController');
const {iniciarSesion} = require('../controllers/UserController');
const { obtenerInformacionUsuario } = require('../controllers/UserController');
const { editarInformacionUsuario} = require('../controllers/UserController');
const { eliminarUsuario } = require ('../controllers/UserController');

const router = Router();

router.post('/register', registroUsuario);
router.get('/users', obtenerUsuarios);
router.post('/login', iniciarSesion);
router.get('/users/:id', obtenerInformacionUsuario);
router.put('/edit/:id', editarInformacionUsuario);
router.delete('/delete/:id', eliminarUsuario);


module.exports = router;

