const express = require("express")
const database = require("../database/index")
const router = express.Router()

const jwt = require('jsonwebtoken')
const CryptoJS = require("crypto-js");
const key = "Roxanna"

const generateToken = (req, res, next) =>{
    req.generateToken = jwt.sign({server: "SRACGS50ENA"}, key, {expiresIn: "1min"}, {algorithm: "HS256"})
    next()
}

const validateToken = (req, res, next) =>{
    jwt.verify(req.body.token, key, function(err, decoded){
        if(decoded){
            next()
        }else{
            res.json({
                token: false
            })
        }
    })
}

router.get("/", generateToken, (req, res) =>{
    res.render("administrador",{
        token: req.generateToken,
        title: "Administrador",
        styles: "administrador",
        scripts: "administrador"
    })
})

router.post("/", validateToken, async (req, res) =>{

    const consulta = await database.query(`SELECT * FROM administrador WHERE usuario = '${req.body.usuario}' AND contrasena = '${req.body.contrasena}' `)

    if(consulta.rows == 0){
        res.json({
            acceso: false
        })
        return
    }

    const sesion ={
        id: consulta.rows[0].id,
        usuario: consulta.rows[0].usuario,
        contrasena: consulta.rows[0].contrasena,
        cargo: "ADMINISTRADOR"
    }

    const sesionCookie = CryptoJS.AES.encrypt(JSON.stringify(sesion), key).toString()

    res.cookie("sesion", sesionCookie,{
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.json({
        acceso: true
    })
})

module.exports = router;