const User = require("../models/User");
const { nanoid } = require('nanoid');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
require('dotenv').config();//Esto es para poder usar las variables de entorno

const registerForm = (req, res) =>{
    res.render('register');
}

const registerUser = async(req, res) =>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        req.flash("mensajes", erros.array());
        return res.redirect("/auth/register");
    }
    //console.log(req.body);
    const { userName, email, password } = req.body;
    try {
        
        let user = await User.findOne({email});
        if(user) throw new Error("El usuario ya existe");//hacemos que se frene la aplicacion aca
        user = new User({userName, email, password, tokenConfirm: nanoid()});
        user.save();
        //Enviar correo electronico para confirmar la cuenta
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.USERNAME_EMAIL,
              pass: process.env.PASSWORD_EMAIL
            }
          });

          await transport.sendMail({
            from: "Fred Foo <foo@example.com>", //process.env.USERNAME_EMAIL,
            to: user.email,
            subject: "Confirmar Cuenta",
            text: "Confirmar Cuenta",
            html: "<a href='http://localhost:3000/auth/confirmarCuenta/" + user.tokenConfirm + "'>Confirmar Cuenta</a>"
          })

        req.flash("mensajes", [{msg: "El usuario se ha creado correctamente, Revisa tu correo para confirmar tu cuenta"}]);
        return res.redirect("/auth/login");
    } catch (error) {
       req.flash("mensajes", [{msg: error.message}]);
       return res.redirect("/auth/register");
    }
}


const confirmarCuenta = async (req, res) =>{
    const { token } = req.params;
    try {
        const user = await User.findOne({tokenConfirm: token});
        if(!user) throw new Error("El usuario no existe");
        user.cuentaConfirmada = true;
        user.tokenConfirm = null;
        await user.save();
        req.flash("mensajes", [{msg: "La cuenta se ha confirmado correctamente"}]);
        return res.redirect("/auth/login");
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/login");  
    }
}

const loginForm = (req, res) =>{
    res.render("login");
};


const loginUser = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        //console.log(errors.array());
        req.flash("mensajes", errors.array());
        return res.redirect("/auth/login");
    }

    const { email, password } = req.body;//sacamos el email y el password del formulario enviado
    try {
        const user = await User.findOne({email});   
        if(!user) throw new Error("El usuario no existe");
        if(!user.cuentaConfirmada) throw new Error("La cuenta no ha sido confirmada");
        if(await user.comparePassword(password)){
            //me esta creando la session atraves de passport
            req.login(user, (err)=>{
                if(err) throw new Error("Error al crear la session");
                return res.redirect("/");
            })
        }else{
            throw new Error("La contraseña es incorrecta");
        }
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/auth/login");
    }
};


const cerrarSesion = (req, res) =>{
    req.logout( (err)=>{
        if(err) throw new Error("Error al cerrar la sesion");
    });
    return res.redirect("/auth/login");
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser,
    cerrarSesion,
}