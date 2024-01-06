const {model, Schema} = require('mongoose');

const CalificacionSchema = new Schema({
    
    calificacion : {
        type: String,
        enum: ['Muy Mala', 'Mala','Regular','Buena','Muy Buena'],
        required: true
    },
    comentario : { 
        type: String
    }
    ,
    usuario : {
        type : Schema.Types.ObjectId,
        ref: 'Usuario',
        required : true
    },

    pelicula : {
        type : Schema.Types.ObjectId,
        ref : 'Pelicula',
        required : true
    }
});

module.exports = model('Calificacion', CalificacionSchema);