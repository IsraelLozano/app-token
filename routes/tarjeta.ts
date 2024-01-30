
/*
Ruta: /api/tarjeta
*/
const { Router } = require('express')
const { getTarjeta, crearToken } = require('../controllers/tarjetas')
import { Verify } from "../middlewares/validar-jwt";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validar-campos'

const router = Router();

const listEmail = ['gmail.com', 'hotmail.com', 'yahoo.es', 'camoen@camoens.com'];


router.get('/', Verify, getTarjeta);
router.post('/',
    [
        check("card_number", "El nombre es obligatorio").isFloat({ min: 1 }).not().isEmpty().isLuhnNumber().withMessage("Nro no valido"),
        check("cvv", "El cvv es obligatorio").isLength({ min: 1, max: 3 }).not().isEmpty(),
        check("expiration_month", "El expiration_month es obligatorio o no cumple con el minimo requerido").isLength({ min: 1, max: 2 }).not().isEmpty(),
        check("expiration_year", "El expiration_year es obligatorio").isLength({ min: 1, max: 4 }).not().isEmpty(),
        check("email", "El email es obligatorio")
            .not()
            .isEmpty()
            .isEmail().withMessage("Email no es valido")
            .custom((emil: string) => {
                const indices = emil.indexOf('@') + 1;
                return listEmail.includes(emil.substring(indices));
            }).withMessage('No cumple con el dominio'),
        validarCampos
    ]
    ,
    crearToken);

module.exports = router