'use strict'
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();

app.get('/hola/:name', (req, res) => {
    res.status(200).send({ mensaje: `Hola ${req.params.name} desde SD con JSON!` });
});

app.listen(port, () => {
    console.log(`API REST ejecutándose en http://localhost:${port}/hola/:unNombre`);
});