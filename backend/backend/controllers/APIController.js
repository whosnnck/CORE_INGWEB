const axios = require('axios');

const obtenerDatosDesdeAPI = async () => {
    try {
        const response = await axios.get('https://moviereview-3deb0-default-rtdb.firebaseio.com/MCUmovies.json');

        const datos = response.data;
        console.log('Datos obtenidos de la API:', datos);

        return datos;
    } catch (error) {
        console.error('Error al obtener datos desde la API:', error);
        throw error; 
    }
  
}


module.exports = { obtenerDatosDesdeAPI };
