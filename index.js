'use strict'
const port = process.env.PORT || 3000;
const express = require('express');
const res = require('express/lib/response');
const logger = require('morgan');

const app = express();

// Declaramos los middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false })); // Body tipico
app.use(express.json()); // Body que contenga un objeto JSON

// Declaramos el API a través de los métodos //

// SELECT //
app.get('/api/products', (req, res) => {
    res.status(200).send({ products: [] });
});
app.get(`/api/products/:productID`, (req, res) => {
    res.status(200).send({products: `${req.params.productID}`});
});

// INSERT //
app.post(`/api/products`, (req, res) => {
    console.log(req.body);
    res.status(200).send({products: `El producto se ha recibido`});
});

// UPDATE //
app.put('/api/products/:productID', (req, res) => { 
    res.status(200).send({products: `${req.params.productID}`}); 
});

// DELETE //
app.delete('/api/products/:productID', (req, res) => { 
    res.status(200).send({products: `${req.params.productID}`}); 
}); 

// Lanzar el sevicio API
app.listen(port, () => {
    console.log(`API REST ejecutándose en http://localhost:${port}/api/products`);
});