const express = require('express');
const { create } = require("express-handlebars");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const User = require('./models/User');
const crsf = require('csurf');
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

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Esto es para manejar las sessiones verificar que el usuario este autenticado
//para darle acceso a las rutas que necesite
passport.serializeUser((user, done) => {
    done(null, {id: user._id, email: user.userName});
    
});

passport.deserializeUser(async(user, done) => {
    //verificamos que el usuario exista
    const UserDB = await User.findById(user.id)
    return done(null, {id: UserDB._id, email: UserDB.userName});
});




//Testeo de sessiones
/*app.get("/rutaprotegida", (req, res) => {
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
*/

//Configurar el motor de plantillas
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));//Con esto activamos el formulario
app.use(crsf());//Esto es para proteger las rutas

//Este es un middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash("mensajes");
    res.locals.csrfToken = req.csrfToken();//esto se va a pasar a todas las vistas que se creen
    next();
    //Seria como una variable global
});


app.use("/", require("./routes/homerutas"));
app.use("/auth", require("./routes/auth"));
app.use(express.static(__dirname + "/public")); //Esto es para publicar solo los archivos de la carpeta public
app.listen(puerto, () => console.log("Servidor iniciado en el puerto "+ puerto));