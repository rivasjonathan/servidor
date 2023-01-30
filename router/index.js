const express = require("express")
const database = require("../database/index")
const router = express.Router()

const jwt = require('jsonwebtoken')
const key = "Roxanna"

const generateToken = (req, res, next) =>{
    req.generateToken = jwt.sign({server: "Certificado"}, key, {expiresIn: "5min"}, {algorithm: "HS256"})
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
    res.render("index",{
        token: req.generateToken,
        title: "Certificación  Electrónica SEP",
        styles: "index",
        scripts: "index"
    })
})

router.post("/", validateToken, async (req, res) =>{
    req.body.token = req.body.token.toString()
    const consulta = await database.query(`SELECT * FROM registros WHERE folio = '${req.body.folio}'`)
    res.json(consulta.rows)
})

module.exports = router;