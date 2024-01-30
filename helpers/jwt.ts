require('dotenv').config();
import jwt from 'jsonwebtoken';

export const Signin = (uid: any) => {

    return new Promise((resolve, reject) => {
        // Generamos el token con la información del usuario y lo firmamos con nuestra l
        const payload = {
            tarjeta: uid
        }

        jwt.sign(payload, `${process.env.JWT_SECRET}`, {
            expiresIn: '1m'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject(err + 'Error interno de servidor en el JWT')
            } else {
                resolve(token)
            }
        });
    })
}

module.exports = {
    Signin
}