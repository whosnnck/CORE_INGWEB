const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../model/usuario');
//Registro de un nuevo usuario
exports.registroUsuario = async (req, res) => {

    const {nombre, email, contrasenia, fechaNacimiento, rol} = req.body;

    try {
        const usuarioExistente = await Usuario.findOne({email});
        if (usuarioExistente){
            return res.status(400).json({message: 'El mail ya esta registrado'});
        }
        const hashedContrasenia = await bcrypt.hash(contrasenia, 10);
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            contrasenia: hashedContrasenia,
            fechaNacimiento,
            rol,
        });
        await nuevoUsuario.save();
        res.json({
            ok: true,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error en el servidor'
        });
        
    }
};

//Login de usuario
exports.iniciarSesion = async(req, res) => {
    try{
        const {email, contrasenia} = req.body;
        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(401).json({message: 'Credenciales incorrectas'});
        }
        if (!usuario.email) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if(!contraseniaValida){
            return res.status(401).json({message: 'Credenciales incorrectas'});
        }
        const token = jwt.sign({userId: usuario._id}, 'Secreto', {expiresIn: '1h'});
        console.log(token);
        res.status(200).json({token, userId:usuario._id, message: 'Inicio de sesion correcta'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error en el servidor'})
    }
};

//Detalles del usuario solo peticiones POSTMAN
exports.obtenerUsuarios = async (req, res) => {
    try{
        const usuario = await Usuario.find();

        res.json(usuario)

    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Error en el servidor'})
    }
};

//Detalles del usuario
exports.obtenerInformacionUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findById(req.params.id);
        
        if(!usuario) {
            return res.status(404).json({message: 'Usuario no encontrado'})
        }

        res.status(200).json({
            user: usuario.usuario,
            nombre: usuario.nombre,
            email: usuario.email,
            fechaNacimiento: usuario.fechaNacimiento,
            rol: usuario.rol
        })
    } catch(error){
        console.error(error);
        res.status(500).json({message: 'Error en el servidor'})
    }
};

//Editar informacion del usuario
exports.editarInformacionUsuario = async (req, res) => {
    try{
        const {nombre, email, constraseña, fechaNacimiento} = req.body;

        const usuario = await Usuario.findById(req.params.id);

        if(!usuario){
            return res.status(404).json({message: 'Usuario no encontrado'})
        }

        usuario.nombre = nombre;
        usuario.email = email;

        if(constraseña) {
            const hashConstraseña = await bcrypt.hash(contraseña, 10);
            usuario.contraseña = hashConstraseña;
        }

        usuario.fechaNacimiento = fechaNacimiento;

        await usuario.save();

        res.status(200).json({message: 'Informacion de usuario actualizada con exito'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error en el servidor'});
    }
};

//Eliminar el usuario
exports.eliminarUsuario = async (req, res) => {
    try{
        const usuario = await Usuario.findByIdAndDelete(req.params.id, req.body, {new: true});
        if(!usuario) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        res.json({message: 'Usuario eliminado correctamente'});
    } catch (error) {
        res.status(404).json({message: 'Error al eliminar la Usuario'});
    }
};