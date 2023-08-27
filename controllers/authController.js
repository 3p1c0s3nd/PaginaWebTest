const User = require("../models/User");
const { nanoid } = require('nanoid');

const registerForm = (req, res) =>{
    res.render('register');
}

const registerUser = async(req, res) =>{
    //console.log(req.body);
    const { userName, email, password } = req.body;
    try {
        
        let user = await User.findOne({email});
        if(user) throw new Error("El usuario ya existe");//hacemos que se frene la aplicacion aca
        user = new User({userName, email, password, tokenConfirm: nanoid()});
        res.json(user);
        user.save();
        //Enviar correo electronico para confirmar la cuenta
        res.redirect("/auth/login");
    } catch (error) {
        res.json({error : error.message});
        console.log(error);
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
        res.redirect("/auth/login");
    } catch (error) {
        res.json({error : error.message});
        console.log(error);
    }
}

const loginUser = async(req, res) =>{
    const { email, password } = req.body;//sacamos el email y el password del formulario enviado
    try {
        const user = await User.findOne({email});   
        if(!user) throw new Error("El usuario no existe");
        if(!user.cuentaConfirmada) throw new Error("La cuenta no ha sido confirmada");
        if(await user.comparePassword(password)){
            res.redirect("/");
        }else{
            throw new Error("La contraseña es incorrecta");
        }
    } catch (error) {
        console.log(error);
        res.send(error.message);
    }
}


const loginForm = (req, res) =>{
    res.render("login");
};


module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmarCuenta,
    loginUser
}