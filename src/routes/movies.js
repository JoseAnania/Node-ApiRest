// Requerimos desde EXPRESS su método llamado Router( que nos permite definir nuevas rutas para nuestros servidores)
const {Router} = require('express');
// Guardamos la ejecución del método en una constante
const router = Router();
// Requerimos la bibliote UNDERSCORE
const _ = require('underscore');

// Importamos el JSON (que simula mi base de datos (sample.json)) y lo guardamos en una constante
const movies = require('../sample.json');


// Creamos una ruta para cuando se visite la ruta de mi proyecto("/src/movies") se muestre (GET) un Objeto JSON (con las peliculas almacenadas)
router.get('/', (req, res) => {

    res.json(movies);
});
// Creamos una ruta para cuando se visite la ruta de mi proyecto("/src/movies") se guarde (Post) un Objeto JSON (de películas) (Tener en cuenta que la nueva película se genera en POSTMAN que simula una petición móvil por ej)
router.post('/', (req, res) => {

    const {title, director, year, rating} = req.body;
    // Validamos que recibimos los datos necesarios
    if(title && director && year && rating) {
        // Agregamos el ID automáticamente
        const id = movies.length + 1;
        // Creamos una constante nueva película con los parámetros del Body + el id(...req.body (para no repetir todos los parámetros))
        const newMovie = {...req.body, id}
        // Guardamos la nueva película en mi Arreglo de Películas
        movies.push(newMovie);
        // Enviamos las películas actualizadas luego de la inserción
        res.json(movies);
    }else {
        res.status(500).json({error: 'There was an error'});
    }
    
});

// Creamos una ruta para cuando se visite la ruta de mi proyecto("/src/movies") se actualize (Put) un Objeto JSON (de películas) (Tener en cuenta que la nueva película se actualiza en POSTMAN que simula una petición móvil por ej)
// Se actualiza desde el parámetro ID
router.put('/:id', (req, res) => {
    // Obtenemos el id
    const {id} = req.params;
    const {title, director, year, rating} = req.body;
    // Validamos que recibimos los datos necesarios
    if(title && director && year && rating) {
       _.each(movies, (movie, i) => {
        //Si encuentra la pelícla
        if (movie.id == id) {
            // Modifica el atributo correspondiente por el recibido
            movie.title = title;
            movie.director = director;
            movie.year = year;
            movie.rating = rating;
        }
       }); 
       res.json(movies);
    }else {
        res.status(500).json({error: 'There was an error'});
    }
});


// Creamos una ruta para cuando se visite la ruta de mi proyecto("/src/movies") se elimine (Delete) un Objeto JSON (de películas) (Tener en cuenta que la nueva película se elimina en POSTMAN que simula una petición móvil por ej)
// Se borra desde el parámetro ID
router.delete('/:id', (req, res) => {

    // Obtenemos el id
    const {id} = req.params;
    // Usamos el método de UNDERSCORE para recorrer el arreglo de Películas
    _.each(movies, (movie, i) => {
        // Si el ID que estoy recibiendo es igual al de la ruta, remuevo
        if (movie.id == id) {
            movies.splice(i, 1);
        }
    });
    res.send(movies);
});


// Lo exportamos
module.exports = router;