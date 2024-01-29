const Usuario = require('../backend/model/usuario');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const multer = require('multer');


//Importando Controladores
const app = express();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});


mongoose.connect('mongodb://127.0.0.1:27017/ecumovie', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//Middleware para analizar solicitudes JSON
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './upload'
}))

//Rutas
app.use('/api/peliculas', require('./routes/peliculas') );

app.use('/api/usuarios', require('./routes/usuarios'));

app.use('/api/calificacion', require('./routes/calificacion'));

app.use('/api/test', require('./routes/api'));


//Coneccion al servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('DB Conectado y funcionando');
})