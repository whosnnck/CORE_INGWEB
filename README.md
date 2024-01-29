# Proyecto MERN - Sistema de Votación de Películas

Este proyecto MERN (MongoDB, Express.js, React.js, Node.js) se centra en la creación de un sistema de votación de películas donde los usuarios pueden calificar y dejar comentarios sobre las películas disponibles. Además, se implementa un informe que muestra estadísticas detalladas sobre las votaciones por categoría y usuario.

##Previsualizacion del CORE

![image](https://github.com/whosnnck/CORE_INGWEB/assets/131733484/8a2fa1c0-9e15-4c44-9bee-b61490877541)


## Características

- **Registro y Autenticación de Usuarios**: Los usuarios pueden registrarse, iniciar sesión y cerrar sesión en el sistema. Se implementa un sistema de roles que incluye roles como "Usuario Normal", "Usuario Grupo Cineasta", "Usuario Cineasta Famoso" y "Administrador".

- **Creación, Edición y Eliminación de Películas**: Los administradores tienen la capacidad de agregar, editar y eliminar películas. Cada película tiene información detallada, incluyendo nombre, sinopsis, productor, director, clasificación, tipo y una imagen asociada.

- **Sistema de Calificación y Comentarios**: Los usuarios pueden calificar las películas en una escala de "Muy Mala" a "Muy Buena" y dejar comentarios adicionales. Cada voto y comentario está asociado a un usuario y a una película específica.

- **Informe de Votaciones**: Se implementa un informe que muestra estadísticas detalladas sobre las votaciones. Incluye el número de votos por categoría y usuario, proporcionando una visión completa del comportamiento de los usuarios en relación con las películas.

## Estructura del Proyecto

- **frontend**: Contiene el código fuente del cliente desarrollado con React.js. Aquí se encuentran los componentes, páginas y estilos necesarios para la interfaz de usuario.

- **backend**: Contiene el código fuente del servidor desarrollado con Node.js y Express.js. Aquí se gestionan las rutas, la autenticación de usuarios, la interacción con la base de datos MongoDB y otros aspectos del lado del servidor.

## Configuración del Proyecto

1. **Clonar Repositorio**:
   ```bash
   git clone https://github.com/tuusuario/proyecto-mern-votacion-peliculas.git]
   cd proyecto-mern-votacion-peliculas
##DIAGRAMA DE ACTIVIDADES DEL CORE

![image](https://github.com/whosnnck/CORE_INGWEB/assets/131733484/559f06df-228b-4762-8df3-ca29477d3a47)
