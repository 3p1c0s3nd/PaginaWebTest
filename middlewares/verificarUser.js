module.exports = (req, res, next) => {
//ESTE ES UN MIDDLEWARE

    //en caso de que tenga una session activa
    if(req.isAuthenticated()){
        return next();
    }

    //si no tiene session activa redirigimos a la pagina de login
    res.redirect("/auth/login");
}