const express = require('express');
const { create } = require("express-handlebars");
require('dotenv').config();//Esto es para poder usar las variables de entorno
require('./database/db');//Para la conexion a la base de datos


const app = express();
const puerto = process.env.PORT || 9000;
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});




//Configurar el motor de plantillas
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));//Con esto activamos el formulario
app.use("/", require("./routes/homerutas"));
app.use("/auth", require("./routes/auth"));
app.use(express.static(__dirname + "/public")); //Esto es para publicar solo los archivos de la carpeta public
app.listen(puerto, () => console.log("Servidor iniciado en el puerto "+ puerto));