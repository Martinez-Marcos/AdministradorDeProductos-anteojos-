const express = require("express");

const server = express();
require('dotenv').config();

const products = require('./routes/products.js');

// Variables del servidor
server.set('PORT', process.env.SERVER_PORT || 4000);
server.set('HOST', process.env.SERVER_HOST || "127.0.0.1");

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Rutas
server.use('/glasses', products);

//Direccionamiento de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>La URL no existe o no esta disponible</h3>`);
});

//Escuchar peticiones
server.listen(server.get('PORT'), server.get('HOST'), () => {
    console.log(`Server listening in http://${server.get('HOST')}:${server.get('PORT')}/glasses`);
});