const {model, Schema} = require('mongoose');

const UsuarioSchema = new Schema({
    email : {type: String, required: true, unique: true},
    nombre : {type: String, required: true},
    contrasenia : {type: String, required: true},
    fechaNacimiento : {type: Date, required: true},
    rol : {
        type: String,
        enum: ['Usuario Normal', 'Usuario grupo cineasta','Usuario cineasta famoso','Administrador'],
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);