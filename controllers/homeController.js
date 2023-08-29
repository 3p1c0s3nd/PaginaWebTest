const Url = require('../models/Url.js');
const { nanoid } = require('nanoid');

const leerUrls = async(req, res) =>{
    try{
        const urls = await Url.find({user: req.user.id}).lean();
        res.render("home", {urls: urls});
    }catch(err){
        req.flash("mensajes", [{msg: "Error al Leer las Urls"}]);
        return res.redirect("/");
    }

}


const agregarUrl = async(req, res) =>{
    
    //console.log(req.body);
    const { origin } = req.body;

    try{
        const url = new Url({origin: origin, shortURL: nanoid(6), user: req.user.id});
        await url.save();
        req.flash("mensajes", [{msg: "Url Agregada"}]);
        res.redirect("/");
    }catch(err){
        req.flash("mensajes", [{msg: "Error al Agregar la Url"}]);
        return res.redirect("/");
    }
};


const eliminarUrl = async(req, res) =>{
    const { id } = req.params;
    try{
        //await Url.findByIdAndDelete(id);
        const url = await Url.findByIdAndDelete(id);//obtenemos la url que el usuario esta buscando
        if(url.user.toString() !== req.user.id){
            throw new Error("No tienes permisos para eliminar esta url");
        }
        await url.remove();
        req.flash("mensajes", [{msg: "Url Eliminada"}]);
        res.redirect("/");
    }catch(err){
        req.flash("mensajes", [{msg: err.message}]);
        return res.redirect("/");
    }
}

const editarUrlForm = async(req, res) =>{
    const { id } = req.params;
    try {
        const url = await Url.findById(id).lean();
        if(!url.user.equals(req.user.id)){
            throw new Error("No tienes permisos para editar esta url");
        }
        console.log(url);
        res.render("home", {url});
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
   
}

const editarUrl = async(req, res) =>{
    const { id } = req.params;
    const { origin } = req.body;
    try {
        const url = await Url.findById(id);
        if(!url.user.equals(req.user.id)){
            throw new Error("No tienes permisos para editar esta url");
        }

        await Url.updateOne({origin});
        req.flash("mensajes", [{msg: "Url editada"}]);
       //await Url.findByIdAndUpdate(id, {origin});
       res.redirect("/");
    } catch (error) {
        req.flash("mensajes", [{msg: error.message}]);
        return res.redirect("/");
    }
}

const redireccionamiento = async(req, res) =>{
    const { shortURL } = req.params;
   try {
     const urlDB = await Url.findOne({shortURL: shortURL});
     console.log(urlDB.origin);
     res.redirect(urlDB.origin);
   } catch (error) {
    req.flash("mensajes", [{msg: "Error al redireccionar la url"}]);
    return res.redirect("/auth/login");
   }
}

module.exports = {
    leerUrls,
    agregarUrl,
    eliminarUrl,
    editarUrlForm,
    editarUrl,
    redireccionamiento
};