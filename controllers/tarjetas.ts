import { Signin } from "../helpers/jwt"
import { tarjeta } from "../models/tarjeta"

import { response } from "express";

import { dbConnection } from '../database/config';

export const getTarjeta = (req: any, res: any) => {

    const { cvv, ...camoens } = req.data

    res.json({
        ok: true,
        tarjeta: camoens
    })

}
export const crearToken = async (req: any, res = response) => {
    //Mostrar mensaje de bienvenida

    const { card_number } = req.body
    const requet: tarjeta = { ...req.body }

    try {
        const client = await dbConnection().then(async (result: any) => {
            result.hSet(`tarjeta:${card_number}`, requet)

        }).catch((err: any) => {
            console.log(err)
        });

        const token = await Signin(requet);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... resvisar logs",
        });
    }


}

