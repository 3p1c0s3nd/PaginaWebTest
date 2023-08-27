const express = require('express');
const { create } = require("express-handlebars");
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();//Esto es para poder usar las variables de entorno
require('./database/db');//Para la conexion a la base de dato
const app = express();
const puerto = process.env.PORT || 9000;
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sid',
}));


//Testeo de sessiones
app.get("/rutaprotegida", (req, res) => {
    res.json(req.session.usuario || "No tienes autorizacion");
});

app.get("/creatsession", (req, res) => {
    req.session.usuario = "Hola";
    res.redirect("/rutaprotegida");
});

app.get("/borrarsession", (req, res) => {
    req.session.destroy();
    res.redirect("/rutaprotegida");
})


//Configurar el motor de plantillas
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));//Con esto activamos el formulario
app.use("/", require("./routes/homerutas"));
app.use("/auth", require("./routes/auth"));
app.use(express.static(__dirname + "/public")); //Esto es para publicar solo los archivos de la carpeta public
app.listen(puerto, () => console.log("Servidor iniciado en el puerto "+ puerto));