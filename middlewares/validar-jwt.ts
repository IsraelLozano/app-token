import { tarjeta } from './../models/tarjeta';
require('dotenv').config();

import jwt from 'jsonwebtoken';

export const Verify = (req: any, res: any, next: any) => {
    //Leer token
    // const token = req.('x-token');
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // Remove Bearer from string
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición.'
        })
    }

    token = token.replace(/^Bearer\s+/, "");

    try {
        //Verificar el token con JWT
        const data = jwt.verify(token, `${process.env.JWT_SECRET}`);

        const { tarjeta } = JSON.parse(JSON.stringify(data))

        req.data = tarjeta;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto o caducado.'
        })
    }
}

module.exports = {
    Verify
}


/*
, (err: any, decoded: any) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Token no valido o fallido'
                });
            }
            const result = JSON.parse(decoded?.tarjeta);
            console.log('result verify', decoded?.tarjeta)
            req = { ...result };

            next();
        })

*/