'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET = require('../config').secret;
const EXP_TIME = require('../config').tokenExpTmp;

// Crear un token
//
// Devuelve un token JWT tipo BearerToken
// 
function creaToken(user) {
    const payload = {
        sub: user._id,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(EXP_TIME, 'minutes').unix()
    };
    return jwt.encode(payload, SECRET);
}

// Decodificar un token
//
// Devuelve el id del usuario
//
function decodificaToken(token) {
    return new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, SECRET, true);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha caducado'
                });
            }
            //console.log(payload);
            resolve({
                id: payload.sub,
                rol: payload.rol
            });
        } catch {
            reject({
                status: 500,
                message: 'El token no es valido'
            });
        }
    });
}

module.exports = {
    creaToken,
    decodificaToken
};