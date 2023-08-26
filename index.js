const express = require('express');
const { create } = require("express-handlebars");

const app = express();
const puerto = 9000;
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

//Configurar el motor de plantillas
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");


app.get("/", (req, res) =>{
    const urls = [
        {origin: "www.google.com", shortURL: "dasdasdas"},
        {origin: "www.facebook.com", shortURL: "ffffff"},
        {origin: "www.twitter.com", shortURL: "ggggggg"}
    ];
    res.render("home", {titulo: "Titulo Home", urls: urls});
});

app.get("/login", (req, res) => {
    res.render("login", {titulo: "Titulo Login"});
});

app.use(express.static(__dirname + "/public")); //Esto es para publicar solo los archivos de la carpeta public
app.listen(puerto, () => console.log("Servidor iniciado en el puerto "+ puerto));