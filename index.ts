require('dotenv').config();

const express = require("express");
const cors = require('cors')

const { dbConnection } = require('./database/config')

//Crear servidor express
const app = express();

//Configurando CORS
app.use(cors())

//Indicamos el puerto que va a escuchar nuestro servidor
app.listen(process.env.PORT, () =>
    console.log(`Escuchando en http://localhost:${process.env.PORT}`)
);

//Database
dbConnection();


//Rutas
app.get('/', (req: any, res: any) => {
    //Mostrar mensaje de bienvenida
    res.json({
        ok: true,
        message: 'Bienvenido a mi API RESTful by Camoens'
    })

});