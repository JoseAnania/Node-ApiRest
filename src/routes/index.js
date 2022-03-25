// Requerimos desde EXPRESS su método llamado Router( que nos permite definir nuevas rutas para nuestros servidores)
const {Router} = require('express');
// Guardamos la ejecución del método en una constante
const router = Router();

//--Routes--

// Creamos una ruta para cuando se visite una ruta de mi proyecto("/test") se muestre un Objeto JSON (nombre y web )
router.get('/test', (req, res) => {

    const data = {
        "name": "José",
        "website": "www.jose.com.ar"
    };
    res.json(data);
});

// Lo exportamos
module.exports = router;