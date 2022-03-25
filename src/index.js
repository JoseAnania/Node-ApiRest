// Guardamos en una constante que requerimos EXPRESS
const express = require('express');
// Guardamos en una constante que requerimos MORGAN
const morgan = require('morgan');
// Guardamos en una constante la ejecución del Framework EXPRESS
const app = express();


// 1--Settings--

// Establecemos que el puerto será el que nos provea la nube o el 3000
app.set('port', process.env.PORT || 3000);
// Esta configuración sólo sirve para acomodar el Objeto Json que mandamos en Route (Hello World)
app.set('json spaces', 2);
// 2--Middlewares-- (Con esto soportamos los datos que vamo a recibir)

// Usamos MORGAN. Al ejecutarlo le damos un parámetro (MORGAN nos permite ver por consola lo que va llegando al servidor) (El parámetro define lo que veremos en la terminal (dev, combined, etc...))
app.use(morgan('dev'));
// Este método nos permite recibir y entender datos que llegan a nuestro servidor (el parámetro extended en falso es para recibir datos simples (no imagenes por ej.))
app.use(express.urlencoded({extended:false}));
// Este método permite recibir archivos JSON y entenderlos
app.use(express.json());

// 3--Routes-- (Ver archivo routes/index.js)

// Importamos la ruta (desde route/index.js)
app.use(require('./routes/index'));
// Importamos la ruta (desde route/movies.js) y le decimos que agregue a la dirección API (/api/movies)
app.use('/api/movies',require('./routes/movies'));

// 4--Starting the Server--

// Ejectumos la aplicación, diciendo que escuche en el puerto 3000 y creamos una función para que cuando inicie muestro el mensaje
app.listen(app.get('port'), () => {

    console.log(`Server on port ${app.get('port')}`);
})