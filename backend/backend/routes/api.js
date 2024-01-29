const { Router } = require('express');

// const {  } = require('../controllers/usuarios');
const { obtenerDatosDesdeAPI } = require('../controllers/APIController');

const router = Router();

router.get('/movieapi', obtenerDatosDesdeAPI);

module.exports = router;