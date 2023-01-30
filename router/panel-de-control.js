const express = require("express")
const database = require("../database/index")
const CryptoJS = require("crypto-js")
const { v4: uuidv4 } = require('uuid');
const key = "Roxanna"
const router = express.Router()

const auth = async (req, res, next) =>{
    if(req.cookies.sesion){
        const bytes = CryptoJS.AES.decrypt(req.cookies.sesion, key)
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

        const inicioDeSesion = await database.query(`SELECT * FROM administrador WHERE usuario = '${data.usuario}' AND contrasena = '${data.contrasena}'`)
        if(inicioDeSesion.rows == 0){
            res.redirect("/administrador")
        }else{
            next()
        }
    }else{
        res.redirect("/administrador")
    }
}

const auth_v2 = async (req, res, next) =>{
    if(req.cookies.sesion){
        const bytes = CryptoJS.AES.decrypt(req.cookies.sesion, key)
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        
        const inicioDeSesion = await database.query(`SELECT * FROM administrador WHERE usuario = '${data.usuario}' AND contrasena = '${data.contrasena}'`)
        if(inicioDeSesion.rows ==0){
            res.json({
                acceso: false
            })
        }else{
            next()
        }
    }else{
        res.json({
            acceso: false
        })
    }
}

const generateToken = (req, res, next) =>{

    const bytes = CryptoJS.AES.decrypt(req.cookies.sesion, key);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const miembro={
        id: data.id,
        usuario: data.usuario,
        contrasena: data.contrasena,
        cargo: "ADMINISTRADOR"
    }

    req.generateToken = CryptoJS.AES.encrypt(JSON.stringify(miembro), key).toString()
    next()
}

const validateToken = (req, res, next) =>{
    const bytesToken = CryptoJS.AES.decrypt(req.body.token, key);
    const dataToken = JSON.parse(bytesToken.toString(CryptoJS.enc.Utf8));

    const bytesCookie = CryptoJS.AES.decrypt(req.cookies.sesion, key)
    const dataCookie = JSON.parse(bytesCookie.toString(CryptoJS.enc.Utf8));

    if((dataToken.id == dataCookie.id) && (dataToken.usuario == dataCookie.usuario) && (dataToken.contrasena == dataCookie.contrasena) && (dataToken.cargo == dataCookie.cargo)){
        next()
    }else{
        res.json({
            token: false
        })
    }
}

router.get("/", auth, generateToken, (req, res) =>{
    console.log("entro");
    res.render("panel-de-control",{
        token: req.generateToken,
        title: "Panel de control",
        styles: "panel-de-control",
        scripts: "panel-de-control"
    })
})

router.post("/", auth_v2, validateToken, async (req, res) =>{
    const consulta = await database.query("SELECT * FROM registros")
    res.json(consulta.rows)
})

router.post("/buscar", auth_v2, validateToken, async (req, res) =>{
    console.log("entro");
    const consulta = await database.query(`SELECT * FROM registros WHERE nombre LIKE '%${req.body.buscar}%'`)
    res.json(consulta.rows)
    console.log(consulta.rows);
})

router.post("/agregar", auth_v2, validateToken, async (req, res) =>{

    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let fecha

    if(month < 10){
        fecha = `${day}-0${month}-${year}`
    }else{
        fecha = `${day}-${month}-${year}`
    }

    fecha = fecha + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    const agregar = {
        id: uuidv4(),
        nombre: req.body.nombre,
        documento: req.body.documento,
        estudios: req.body.estudios,
        carrera: req.body.carrera,
        folio: req.body.folio,
        autoridad: req.body.autoridad,
        fecha,
        promedio: req.body.promedio,
        estatus: req.body.estatus
    }

    const consulta = "INSERT INTO registros (id, nombre, documento, estudios, carrera, folio, autoridad, fecha, promedio, estatus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"
    const values = [uuidv4(), req.body.nombre, req.body.documento, req.body.estudios, req.body.carrera, req.body.folio, req.body.autoridad, fecha, req.body.promedio, req.body.estatus]

    await database.query(consulta, values)

    res.json({
        respuesta: true
    })
})

router.put("/editar", auth_v2, validateToken, async (req, res) =>{

    const consulta = 'UPDATE registros SET nombre = $1, documento = $2, estudios = $3, carrera = $4, folio = $5, autoridad = $6, fecha = $7, promedio = $8, estatus = $9 WHERE id = $10'
    const values = [req.body.nombre, req.body.documento, req.body.estudios, req.body.carrera, req.body.folio, req.body.autoridad, req.body.fecha, req.body.promedio, req.body.estatus, req.body.id]
    
    await database.query(consulta, values)
    res.send(true)
})

router.delete("/eliminar", auth_v2, validateToken, async (req, res) =>{
    const consulta = 'DELETE FROM registros WHERE id = $1'
    const value = [req.body.id]
    await database.query(consulta, value)
    res.send(true)
})

module.exports = router;