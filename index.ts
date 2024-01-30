require('dotenv').config();

import express from "express";
import cors from 'cors';

import { dbConnection } from './database/config';

//Crear servidor express
const app = express();

//Configurando CORS
app.use(cors())

//Lectura y parseo del body
app.use(express.json());


//Database
dbConnection();

//Rutas
app.use('/api/tarjeta', require('./routes/tarjeta'));

//Indicamos el puerto que va a escuchar nuestro servidor
app.listen(process.env.PORT, () =>
    console.log(`Escuchando en http://localhost:${process.env.PORT}`)
);