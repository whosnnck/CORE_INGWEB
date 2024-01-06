const Calificacion = require('../model/calificacion');
const Pelicula = require('../model/pelicula');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario')

const preCalificacionMapping = {
  'Muy Mala': 1,
  'Mala': 2,
  'Regular': 3,
  'Buena': 4,
  'Muy Buena': 5,
};

exports.agregarCalificacion = async (req, res) => {
  try {
    // Verificar si existe el encabezado de autorización
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Falta el encabezado de autorización' });
    }

    // Dividir la cadena de autorización si está presente
    const tokenArray = req.headers.authorization.split(' ');

    // Verificar si el token se dividió correctamente
    if (tokenArray.length !== 2) {
      return res.status(401).json({ message: 'Formato de token incorrecto' });
    }

    // Obtener el token
    const token = tokenArray[1];

    // Verificar si el token está presente
    if (!token) {
      return res.status(401).json({ message: 'Token de autorización no proporcionado' });
    }

    // Decodificar el token para obtener la información del usuario
    const { userId } = jwt.verify(token, 'Secreto');

    // Obtener el rol del usuario desde la base de datos
    const usuario = await Usuario.findById(userId);
    const userRole = usuario.rol;

    const { calificacion, comentario, peliculaId } = req.body;

    const preCalificacion = preCalificacionMapping[calificacion];

    // Definicion de variables para la formula
    let calificacionTotal = 0;

    // Obtener la película
    const pelicula = await Pelicula.findById(peliculaId);
    console.log('inicio el if');
    // Verificar el tipo de usuario y asignar el valor de voto correspondiente
    if (userRole === 'Usuario Normal') {
      calificacionTotal = preCalificacion;
      console.log('calificacion total',calificacionTotal);
      pelicula.numeroVotos +=1;
      console.log('en el if normal');
    } else if (userRole === 'Usuario grupo cineasta') {
      calificacionTotal = 2 * preCalificacion;
      pelicula.numeroVotos += 1;
      console.log('en el if grypo');
    } else if (userRole === 'Usuario cineasta famoso') {
      calificacionTotal = 3 * preCalificacion;
      pelicula.numeroVotos += 1;
      console.log('en el if famoso');
    }
    console.log('paso el if');
    console.log('cantidad de votos', pelicula.numeroVotos);
    console.log('calificacionTotal previo a la suma nnueva ',pelicula.sumaCalificaciones);
    console.log('calificacion pelicula pre formula ', pelicula.calificacionPelicula);

    pelicula.sumaCalificaciones += calificacionTotal;
    console.log('calificacionTotal despues a la suma nnueva ',pelicula.sumaCalificaciones);
    console.log('precalificaciongeneral ', calificacionTotal);
    pelicula.calificacionPelicula = parseFloat(((pelicula.sumaCalificaciones)/pelicula.numeroVotos).toFixed(2));

    console.log('calificacion pelicula post formula',pelicula.calificacionPelicula);
    const nuevaCalificacion = new Calificacion({
      calificacion,
      comentario,
      pelicula: peliculaId,
      usuario: userId,
    });

    const calificacionGuardada = await nuevaCalificacion.save();

    await pelicula.save();

    res.status(201).json({
      message: calificacionGuardada
    });
  } catch (error) {
    console.error('Error al crear la calificación: ', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.obtenerComentarioPorPelicula = async (req, res) => {
  try {
    const peliculaId = req.params.peliculaId;
    const calificaciones = await Calificacion.find({ pelicula: peliculaId });
    const comentarios = [];

    // Iterar sobre cada calificación y obtener información del usuario
    for (const calificacion of calificaciones) {
      const usuario = await Usuario.findById(calificacion.usuario);
      comentarios.push({
        usuario: usuario ? usuario.nombre : 'Usuario no encontrado', // Puedes ajustar según la estructura de tu modelo de usuario
        comentario: calificacion.texto
      });
    }

    res.status(200).json({ comentarios });
  } catch (error) {
    console.error('Error al obtener los comentarios', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.obtenerVotosPorUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.query;

    const votosUsuario = await Calificacion.find({ usuario: usuarioId }).populate('pelicula', 'nombre');

    res.json(votosUsuario);
  } catch (error) {
    console.error('Error al obtener los votos:', error.message);
    res.status(500).json({ message: 'Error al obtener los votos.' });
  }
};

