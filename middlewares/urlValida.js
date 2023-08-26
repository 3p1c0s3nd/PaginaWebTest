const { URL } = require("url");

const validarUrl = (req, res, next) => { 
    try{
        const { origin } = req.body;
        const urlFrontend = new URL(origin);
        if(urlFrontend.origin != null){
            return next();
        }else{
            throw new Error("Url no valida");
        }
    }catch(err){
        console.log(err);
        return res.send("URL no valida");
    }
   
}

module.exports = validarUrl;