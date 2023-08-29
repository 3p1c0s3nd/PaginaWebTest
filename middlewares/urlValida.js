const { URL } = require("url");

const validarUrl = (req, res, next) => { 
    try{
        const { origin } = req.body;
        const urlFrontend = new URL(origin);
        if(urlFrontend.origin != null){
            if(urlFrontend.origin.startsWith("http://") || urlFrontend.origin.startsWith("https://")){
                return next();
            }else{
                throw new Error("Url no valida");
            }
        }else{
            throw new Error("Url no valida");
        }
    }catch(err){
        if(err == "Url no valida"){
            req.flash("mensajes", [{msg: err}]);
        }else{
            req.flash("mensajes", [{msg: error.message}]);
        }
       
        return res.redirect("/");
    }
   
}

module.exports = validarUrl;