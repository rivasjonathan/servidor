const express = require("express")
const hbs = require("hbs")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

const port = process.env.PORT || 8000

//Motor de plantillas
hbs.registerPartials('./views/partials',)
app.set('view engine', 'hbs')
app.set("views", __dirname + "/views")
//Motor de plantillas

//Carpeta publica
app.use(express.static("./public"));
//Carpeta publica

//Rutas
app.use("/", require("./router/index"))
app.use("/administrador", require("./router/administrador"))
app.use("/administrador/panel-de-control", require("./router/panel-de-control"))
//Rutas

app.listen(port, () =>{
    console.log("Certificados => http://localhost:"+port);
});