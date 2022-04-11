'use strict'

const port = process.env.PORT || 3000;

// Seguridad

const https = require('https');
const fs = require('fs');

const OPTIONS_HTTPS = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');
const cors = require('cors');

const app = express();

var db = mongojs("SD"); // Enlazamos con la DB "SD"
var id = mongojs.ObjectId;

// Declaramos los middleware
var allowMethods = (req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    return next();
};
var allowCrossTokenHeader = (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    return next();
}
var allowCrossTokenOrigin = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    return next();
}
var auth = (req, res, next) => {
    if (req.headers.token === "password1234") {
        return next();
    } else {
        return next(new Error("No autorizado"));
    }
}

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false })); // Body tipico
app.use(express.json()); // Body que contenga un objeto JSON
app.use(cors());
app.use(allowMethods);
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);

// Trigger previo a las rutas para dar soporte a multiples colecciones
app.param("coleccion", (req, res, next, coleccion) => {
    console.log('parametro /api/:coleccion');
    console.log('coleccion: ', coleccion);

    req.collection = db.collection(coleccion);
    return next();
});

// Routes //

// Todas las colecciones existentes en la DB
app.get('/api', (req, res, next) => {
    console.log('GET /api');
    console.log(req.params);
    console.log(req.collection);

    db.getCollectionNames((err, colecciones) => {
        if (err) return next(err);
        res.json(colecciones);
    });
});
// Todos los elementos de la tabla {coleccion}
app.get('/api/:coleccion', (req, res, next) => {
    req.collection.find((err, coleccion) => {
        if (err) return next(err);
        res.json(coleccion);
    });
});
// El elemento {id} de la tabla {coleccion}
app.get('/api/:coleccion/:id', (req, res, next) => {
    req.collection.findOne({ _id: id(req.params.id) }, (err, elemento) => {
        if (err) return next(err);
        res.json(elemento);
    });
});

// Creamos un nuevo elemento en la tabla {coleccion}
app.post(`/api/:coleccion`, auth, (req, res, next) => {
    const elemento = req.body;

    if (!elemento.nombre) {
        res.status(400).json({
            error: 'Bad data',
            description: 'Se precisa al menos un campo <nombre>'
        });
    } else {
        req.collection.save(elemento, (err, coleccionGuardada) => {
            if (err) return next(err);
            res.json(coleccionGuardada);
        });
    }
});

// Modificamos el elemento {id} de la tabla {coleccion}
app.put('/api/:coleccion/:id', auth, (req, res, next) => {
    let elementoId = req.params.id;
    let elementoNuevo = req.body;
    req.collection.update({ _id: id(elementoId) }, { $set: elementoNuevo }, { safe: true, multi: false }, (err, elementoModif) => {
        if (err) return next(err);
        res.json(elementoModif);
    });
});

// Eliminamos el elemento {id} de la tabla {coleccion}
app.delete('/api/:coleccion/:id', auth, (req, res, next) => {
    let elementoId = req.params.id;

    req.collection.remove({ _id: id(elementoId) }, (err, resultado) => {
        if (err) return next(err);
        res.json(resultado);
    })
});

https.createServer(OPTIONS_HTTPS, app).listen(port, () => {
    console.log(`SEC WS API REST CRUD con DB ejecutandose en https://localhost:${port}/api/:coleccion/:id`)
});